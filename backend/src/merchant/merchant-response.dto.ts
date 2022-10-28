import { Types } from 'mongoose';
import { IAudit } from './../infrastructure/database/mongoDB/base-document.interface';
export interface IMerchantResponseDTO extends IAudit {
  id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  organisationName: string;
  phoneNumber: string;
  passwordHash: string;
  role: string;
  isActive: boolean;
  status?: string;
  organisationAddress: string;
}
