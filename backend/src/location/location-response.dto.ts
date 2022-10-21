import { Types } from 'mongoose';
import { IAudit } from './../infrastructure/database/mongoDB/base-document.interface';
export interface ILocationResponseDTO extends IAudit {
  id: Types.ObjectId;
  address: string;
  address2?: string;
  city: string;
  country: string;
  postCode: string;
  state: string;
  latitude?: string;
  longitude?: string;
}
