import { ICategoryResponseDTO } from './../category/category-response.dto';
import { Types } from 'mongoose';
import { IAudit } from './../infrastructure/database/mongoDB/base-document.interface';
export interface IAddonResponseDTO extends IAudit {
  id: Types.ObjectId;
  name: string;
  quantity: number;
  category: ICategoryResponseDTO;
  description: string | undefined;
}
