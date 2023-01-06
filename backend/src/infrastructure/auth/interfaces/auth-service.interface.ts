import { GenericDocumentRepository } from 'src/infrastructure/database';
import { Document, Types } from 'mongoose';
import { IUserPayload, ISignUpTokens } from './auth.interface';
export interface IAuthService<TEntity, T extends Document> {
  generateAuthTokens(payload: IUserPayload): Promise<ISignUpTokens>;
  hashData(prop: string, saltRound: number): Promise<string>;
  updateRefreshToken(
    model: GenericDocumentRepository<TEntity, T>,
    userId: Types.ObjectId,
    refreshToken: string,
  ): Promise<{ accessToken: string }>;
  nullifyRefreshToken(model: GenericDocumentRepository<TEntity, T>, userId: Types.ObjectId);
  logOut(model: GenericDocumentRepository<TEntity, T>, userId: Types.ObjectId);
}
