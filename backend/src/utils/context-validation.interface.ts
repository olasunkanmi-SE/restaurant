import { GenericDocumentRepository } from '../infrastructure/database';
export interface IValidateUser {
  getUser(model: GenericDocumentRepository<any>, props: { email: string; role?: string }): Promise<any | undefined>;
}
