import { Types } from 'mongoose';
import { IAudit } from 'src/infrastructure';
import { OrderStatus } from 'src/order_statuses/order_status';

export interface IOrderResponseDTO extends IAudit {
  id: Types.ObjectId;
  state: OrderStatus;
  type: string;
  merchantId: Types.ObjectId;
  customerId?: Types.ObjectId;
  total: number;
  discount?: number;
  orderManagerId?: Types.ObjectId;
}
