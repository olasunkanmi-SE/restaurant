import { IUserPayload, ISignUpTokens, IJwtPayload } from './auth.interface';
export interface IAuthService {
  generateAuthTokens(payload: IUserPayload): Promise<ISignUpTokens>;
  signAccessToken(jwtPayload: IJwtPayload): Promise<string>;
  signRefreshToken(jwtPayload: IJwtPayload): Promise<string>;
}
