import { Types } from 'mongoose';
import { CartItem } from 'src/cart/cart-item';
import { Audit } from 'src/domain';

export type currentStatus = 'CREATED' | 'ACCEPTED' | 'DENIED' | 'FINISHED' | 'CANCELLED';
export type dinningType = 'PICK_UP' | 'DINE_IN' | 'DELIVERY';

export interface IOrder {
  state: currentStatus;
  type: dinningType;
  merchantId: Types.ObjectId;
  customerId?: Types.ObjectId;
  total: number;
  discount?: number;
  orderManagerId?: Types.ObjectId;
  audit: Audit;
  cartItems?: CartItem[];
}
