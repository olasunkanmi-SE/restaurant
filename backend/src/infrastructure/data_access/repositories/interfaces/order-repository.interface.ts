import { Order } from 'src/order/order';
import { OrderDataModel, OrderDocument } from '../schemas/order.schema';
import { IGenericDocument } from 'src/infrastructure/database';
import { Result } from 'src/domain';
import { CreateCartItemsDTO } from 'src/order/dto/create-order.dto';

export interface IOrderRepository extends IGenericDocument<Order, OrderDocument> {
  createOrder(order: OrderDataModel): Promise<Result<Order>>;
  getDuplicateOrder(type: string, merchantId: string, cartItems: CreateCartItemsDTO[]): Promise<boolean>;
  getOrders(): Promise<Result<Order[]>>;
}
