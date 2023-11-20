import { Types } from 'mongoose';
import { Result } from 'src/domain';
import { OrderNote } from 'src/order_notes/order_note';
import { CreateCartItemsDTO, CreateOrderDTO } from '../dto/create-order.dto';
import { Order } from '../order';
import { IOrderResponseDTO } from '../order-response.dto';

export interface IOrderService {
  createOrder(orderSummary: CreateOrderDTO): Promise<Result<IOrderResponseDTO>>;
  getOrders(): Promise<Result<Order[]>>;
  createOrderNotes(cartItems: CreateCartItemsDTO[], orderId: Types.ObjectId): Promise<OrderNote[]>;
}
