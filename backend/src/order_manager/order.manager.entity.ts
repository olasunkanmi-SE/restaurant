import { Audit } from './../domain/audit/audit';
import { Merchant } from './../merchant/merchant';

export type Role = 'ADMIN' | 'SUPERADMIN';
export enum RoleEnum {
  'ADMIN',
  'SUPERADMIN',
}

export interface IOrderManager {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  merchant: Merchant;
  role: number;
  password: string;
  audit: Audit;
}
