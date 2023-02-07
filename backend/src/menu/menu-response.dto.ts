import { Types } from 'mongoose';
import { IAudit } from './../infrastructure/database/mongoDB/base-document.interface';
import { ITemResponseDTO } from './../item/item-response.dto';
export interface IMenuResponseDTO extends IAudit {
  id: Types.ObjectId;
  name: string;
  description?: string;
  discount: number;
  imageUrl: string;
  basePrice: number;
  items?: ITemResponseDTO[];
}
