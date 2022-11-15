import { IMapper } from './../../domain/mapper/mapper';
import { Injectable, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { IAuthService } from './interfaces/auth-service.interface';
import {
  IJwtPayload,
  ISignUpTokens,
  IUserPayload,
} from './interfaces/auth.interface';
import { throwApplicationError } from '../utilities/exception-instance';

@Injectable()
export class AuthService<T> implements IAuthService<T> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateAuthTokens(payload: IUserPayload): Promise<ISignUpTokens> {
    const { userId, email, role } = payload;
    const jwtPayload: IJwtPayload = {
      sub: userId,
      email,
      role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(jwtPayload),
      this.signRefreshToken(jwtPayload),
    ]);

    return {
      refreshToken,
      accessToken,
    };
  }

  private async signAccessToken(jwtPayload: IJwtPayload): Promise<string> {
    return this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      ),
    });
  }

  private async signRefreshToken(jwtPayload: IJwtPayload): Promise<string> {
    return this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      ),
    });
  }

  async hashData(prop: string, saltRound: number): Promise<string> {
    return bcrypt.hash(prop, saltRound);
  }

  async updateRefreshToken(
    model: Model<T>,
    userId: Types.ObjectId,
    refreshToken: string,
  ) {
    const userDoc: any = await model.findById(userId);
    if (userDoc.isSuccess === false || !userDoc._refreshTokenHash) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Access denied');
    }

    let mapper: IMapper<any, T>;
    const userEntity = mapper.toDomain(userDoc);

    const verifyToken = bcrypt.compare(
      refreshToken,
      userEntity.refreshTokenHash,
    );
    if (!verifyToken) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Access denied');
    }
    const payload = { userId, email: userEntity.email, role: userEntity.role };
    const newTokens = await this.generateAuthTokens(payload);
    await model.findOneAndUpdate(
      { _id: userEntity.id },
      { refreshTokenHash: newTokens.refreshToken },
    );
  }
}
