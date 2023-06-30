import { Types } from 'mongoose';

export interface iCartItem {
  id: Types.ObjectId;
  menuId: Types.ObjectId;
  itemId: Types.ObjectId;
  price: number;
  quantity: number;
}
