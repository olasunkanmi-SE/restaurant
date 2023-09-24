import { Order } from 'src/order/order';
import { OrderDataModel, OrderDocument } from '../schemas/order.schema';
import { IGenericDocument } from 'src/infrastructure/database';

export interface IOrderRepository extends IGenericDocument<Order, OrderDocument> {
  getOrders(): Promise<Order[]>;
  createOrder(order: OrderDataModel): Promise<any>;
}
