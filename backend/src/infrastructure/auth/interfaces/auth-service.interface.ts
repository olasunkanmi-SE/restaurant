import { Model, Types } from 'mongoose';
import { IUserPayload, ISignUpTokens } from './auth.interface';
export interface IAuthService<T> {
  generateAuthTokens(payload: IUserPayload): Promise<ISignUpTokens>;
  hashData(prop: string, saltRound: number): Promise<string>;
  updateRefreshToken(
    model: Model<T>,
    userId: Types.ObjectId,
    refreshToken: string,
  );
}
