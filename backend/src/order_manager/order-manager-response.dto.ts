import { Types } from 'mongoose';
import { IAudit } from './../infrastructure/database/mongoDB/base-document.interface';
import { MerchantApiResponse } from './../merchant/merchant-parser';
export interface IOrderManagerDTO extends IAudit {
  id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  merchant: MerchantApiResponse;
  role: number;
}
