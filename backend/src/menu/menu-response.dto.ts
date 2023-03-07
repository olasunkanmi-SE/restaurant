import { Types } from 'mongoose';
import { IAddonResponseDTO } from './../addon/addon-response.dto';
import { ICategoryResponseDTO } from './../category/category-response.dto';
import { IAudit } from './../infrastructure/database/mongoDB/base-document.interface';
import { ITemResponseDTO } from './../item/item-response.dto';
export interface IMenuResponseDTO extends IAudit {
  id: Types.ObjectId;
  name: string;
  description?: string;
  discount: number;
  imageUrl: string;
  basePrice: number;
  category: ICategoryResponseDTO;
  items?: ITemResponseDTO[];
  addons: IAddonResponseDTO[];
}
