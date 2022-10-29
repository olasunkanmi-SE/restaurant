import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserPayload } from './interfaces/auth-strategy.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAuthTokens(payload: IUserPayload) {}
}
