import { Types } from 'mongoose';
import { Audit } from 'src/domain';

export interface ISelectedCartItem {
  menuId: Types.ObjectId;
  itemId: Types.ObjectId;
  price: number;
  quantity: number;
  audit: Audit;
}
