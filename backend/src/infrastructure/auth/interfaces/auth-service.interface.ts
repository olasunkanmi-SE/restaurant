import { IUserPayload, ISignUpTokens } from './auth.interface';
export interface IAuthService {
  generateAuthTokens(payload: IUserPayload): Promise<ISignUpTokens>;
  hashData(prop: string, saltRound: number): Promise<string>;
}
