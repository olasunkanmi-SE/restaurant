import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { GenericDocumentRepository } from '../database';
import { throwApplicationError } from '../utilities/exception-instance';
import { saltRounds } from './../../application/constants/constants';
import { Result } from './../../domain/result/result';
import { IAuthService } from './interfaces/auth-service.interface';
import {
  IJwtPayload,
  ISignUpTokens,
  IUserPayload,
} from './interfaces/auth.interface';

@Injectable()
export class AuthService implements IAuthService {
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
    model: GenericDocumentRepository<any>,
    userId: Types.ObjectId,
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    const result: Result<any | null> = await model.findById(userId);

    if (result.isSuccess === false) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Access denied');
    }
    const userDoc = await result.getValue();
    const { refreshTokenHash, role, email } = userDoc._doc;
    const verifyToken = await bcrypt.compare(refreshToken, refreshTokenHash);

    if (!verifyToken) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Access denied');
      this.logOutOnSecurityBreach(model, userId);
    }

    const payload = { userId, email, role };
    const newTokens = await this.generateAuthTokens(payload);
    const tokenHash = await this.hashData(newTokens.refreshToken, saltRounds);

    await model.findOneAndUpdate(
      { _id: userDoc._id },
      { refreshTokenHash: tokenHash },
    );

    return {
      accessToken: newTokens.accessToken,
    };
  }

  async logOutOnSecurityBreach(
    model: GenericDocumentRepository<any>,
    userId: Types.ObjectId,
  ) {
    const docResult: Result<any | null> = await model.findById(userId);

    if (docResult) {
      await model.findOneAndUpdate(
        {
          _id: userId,
        },
        { refreshTokenHash: null },
      );
    }
  }

  async logOut(model: GenericDocumentRepository<any>, userId: Types.ObjectId) {
    let result: Result<any | null> = await model.findById(userId);

    if (result.isSuccess === false) {
      throwApplicationError(HttpStatus.NOT_FOUND, 'User does not exist');
    }
    const userDoc = await result.getValue();

    if (
      result &&
      userDoc._doc.refreshTokenHash !== undefined &&
      userDoc._doc.refreshTokenHash !== null
    ) {
      result = await model.findOneAndUpdate(
        {
          _id: userId,
        },
        { refreshTokenHash: null },
      );
      if (result.isSuccess === false) {
        throwApplicationError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Unable to update data',
        );
      }
    }
  }
}
