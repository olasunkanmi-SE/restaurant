import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  imports: [JwtModule.register({})],
  providers: [AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
