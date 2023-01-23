import { Types } from 'mongoose';
import { IAudit } from './../infrastructure/database/mongoDB/base-document.interface';
export interface IAddonResponseDTO extends IAudit {
  id: Types.ObjectId;
  name: string;
  code: string;
  quantity: number;
  description: string | undefined;
}
