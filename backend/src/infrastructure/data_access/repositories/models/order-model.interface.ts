import { Types } from 'mongoose';
import { dinningType } from 'src/order/order-entity.interface';
import { CartItemDataModel } from '../schemas/cartItem.schema';
import { OrderStatusModel } from '../schemas/order-status.schema';

export interface IOrderDataModel {
  readonly state: OrderStatusModel;
  readonly type: dinningType;
  readonly singleclientId: Types.ObjectId;
  readonly customerId?: Types.ObjectId;
  readonly total: number;
  readonly discount?: number;
  readonly orderManagerId?: Types.ObjectId;
  readonly cartItems?: CartItemDataModel[];
}
