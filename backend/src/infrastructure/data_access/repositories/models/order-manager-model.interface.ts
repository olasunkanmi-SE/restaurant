import { SingleClientDataModel } from '../schemas';

export interface IOrderManagerDataModel {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phoneNumber?: string;
  readonly singleclient: SingleClientDataModel;
  readonly role: number;
}
