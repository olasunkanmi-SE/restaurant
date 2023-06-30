import { Types } from 'mongoose';

export interface ICart {
  id: Types.ObjectId;
  menuId: Types.ObjectId;
  total: number;
  items: any[];
}
