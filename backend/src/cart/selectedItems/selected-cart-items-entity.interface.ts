import { Types } from 'mongoose';
import { Audit } from 'src/domain';

export interface ISelectedCartItem {
  cartItemId: Types.ObjectId;
  itemId: Types.ObjectId;
  price: number;
  quantity: number;
  audit: Audit;
}
