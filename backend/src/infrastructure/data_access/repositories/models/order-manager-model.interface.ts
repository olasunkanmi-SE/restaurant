import { MerchantDataModel } from '../schemas';

export interface IOrderManagerDataModel {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phoneNumber?: string;
  readonly merchant: MerchantDataModel;
  readonly role: number;
}
