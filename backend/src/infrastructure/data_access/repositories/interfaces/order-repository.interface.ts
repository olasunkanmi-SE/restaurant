import { Order } from 'src/order/order';
import { OrderDataModel, OrderDocument } from '../schemas/order.schema';
import { IGenericDocument } from 'src/infrastructure/database';
import { CartItemDataModel } from '../schemas/cartItem.schema';
import { Result } from 'src/domain';

export interface IOrderRepository extends IGenericDocument<Order, OrderDocument> {
  createOrder(order: OrderDataModel): Promise<Result<Order>>;
  getDuplicateOrder(type: string, merchantId: string, cartItems: CartItemDataModel[]): Promise<boolean>;
}
