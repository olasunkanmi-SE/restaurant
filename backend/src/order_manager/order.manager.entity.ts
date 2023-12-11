import { Audit } from './../domain/audit/audit';
import { SingleClient } from './../singleclient/singleclient';

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
  singleclient: SingleClient;
  role: number;
  password: string;
  audit: Audit;
}
