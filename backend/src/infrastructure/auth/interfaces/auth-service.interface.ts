import { GenericDocumentRepository } from 'src/infrastructure/database';
import { Types } from 'mongoose';
import { IUserPayload, ISignUpTokens } from './auth.interface';
export interface IAuthService {
  generateAuthTokens(payload: IUserPayload): Promise<ISignUpTokens>;
  hashData(prop: string, saltRound: number): Promise<string>;
  updateRefreshToken(
    model: GenericDocumentRepository<any>,
    userId: Types.ObjectId,
    refreshToken: string,
  ): Promise<{ accessToken: string }>;
  nullifyRefreshToken(model: GenericDocumentRepository<any>, userId: Types.ObjectId);
  logOut(model: GenericDocumentRepository<any>, userId: Types.ObjectId);
}
