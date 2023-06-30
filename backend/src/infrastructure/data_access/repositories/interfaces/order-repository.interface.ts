import { Order } from 'src/order/order';
import { OrderDataModel } from '../schemas/order.schema';

export interface IOrderRepository {
  getOrders(): Promise<Order[]>;
  createOrder(order: OrderDataModel): Promise<any>;
}
