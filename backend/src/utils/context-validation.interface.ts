import { Document } from 'mongoose';
import { GenericDocumentRepository } from '../infrastructure/database';
export interface IValidateUser<TEntity, T extends Document> {
  getUser(model: GenericDocumentRepository<TEntity, T>, props: { email: string; role?: string }): Promise<boolean>;
}
