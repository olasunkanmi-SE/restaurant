import { Types } from 'mongoose';
import { currentStatus, dinningType } from 'src/order/order-entity.interface';
import { CartItemDataModel } from '../schemas/cartItem.schema';

export interface IOrderDataModel {
  readonly state: currentStatus;
  readonly type: dinningType;
  readonly merchantId: Types.ObjectId;
  readonly customerId?: Types.ObjectId;
  readonly total: number;
  readonly quantity: number;
  readonly discount?: number;
  readonly orderManagerId?: Types.ObjectId;
  readonly cartItems: CartItemDataModel[];
}
