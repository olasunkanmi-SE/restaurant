import { Types } from 'mongoose';
import { CartItem } from 'src/cart/cart-item';
import { Audit } from 'src/domain';
import { OrderStatus } from 'src/order_statuses/order_status';

export type currentStatus = 'CREATED' | 'ACCEPTED' | 'DENIED' | 'FINISHED' | 'CANCELLED';
export type dinningType = 'PICK_UP' | 'DINE_IN' | 'DELIVERY';

export interface IOrder {
  state: OrderStatus;
  type: dinningType;
  singleclientId: Types.ObjectId;
  customerId?: Types.ObjectId;
  total: number;
  discount?: number;
  orderManagerId?: Types.ObjectId;
  audit: Audit;
  cartItems?: CartItem[];
}

//tableNumber
//status comment if any
