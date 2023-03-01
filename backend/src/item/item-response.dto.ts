import { Types } from 'mongoose';
import { IAudit } from '../infrastructure/database/mongoDB/base-document.interface';
export interface ITemResponseDTO extends IAudit {
  id: Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  quantity?: number;
  maximumPermitted: number;
}
