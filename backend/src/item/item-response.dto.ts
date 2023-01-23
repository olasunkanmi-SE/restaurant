import { Types } from 'mongoose';
import { portion } from '../infrastructure/data_access/repositories/interfaces/item-model.interface';
import { IAudit } from '../infrastructure/database/mongoDB/base-document.interface';
import { IAddonResponseDTO } from './../addon/addon-response.dto';

export interface ITemResponseDTO extends IAudit {
  id: Types.ObjectId;
  name: string;
  description?: string;
  portion: portion;
  price: number;
  quantity?: number;
  image: string;
  tags?: string[];
  maximumPermitted: number;
  taxRate?: number;
  addons: IAddonResponseDTO[];
}
