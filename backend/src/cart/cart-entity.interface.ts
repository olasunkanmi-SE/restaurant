import { Types } from 'mongoose';
import { ISelectedCartItem } from './cartItems/selected-cart-items-entity.interface';

export interface ICartItem {
  menuId: Types.ObjectId;
  orderId: Types.ObjectId;
  total: number;
  selectedItems: ISelectedCartItem[];
}
