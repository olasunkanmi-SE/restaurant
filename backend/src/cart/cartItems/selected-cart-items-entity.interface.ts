import { Types } from 'mongoose';

export interface ISelectedCartItem {
  menuId: Types.ObjectId;
  itemId: Types.ObjectId;
  price: number;
  quantity: number;
}
