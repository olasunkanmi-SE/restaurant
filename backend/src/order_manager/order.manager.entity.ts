import { Types } from 'mongoose';
import { Audit } from './../domain/audit/audit';

export type Role = 'ADMIN' | 'SUPERADMIN';

export interface IOrderManager {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  merchantId: Types.ObjectId;
  role: Role;
  audit: Audit;
}
