import { Types } from 'mongoose';
import { IAudit } from './../infrastructure/database/mongoDB/base-document.interface';
export interface ICategoryResponseDTO extends IAudit {
  id: Types.ObjectId;
  name: string;
  code: string;
  description?: string;
}
