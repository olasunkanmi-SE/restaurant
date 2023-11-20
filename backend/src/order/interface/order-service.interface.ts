import { Audit, Result } from 'src/domain';
import { CreateCartItemsDTO, CreateOrderDTO } from '../dto/create-order.dto';
import { IOrderResponseDTO } from '../order-response.dto';
import { Order } from '../order';
import { Types } from 'mongoose';
import { IOrderNoteResponseDTO } from 'src/order_notes/dto/order-note-response';

export interface IOrderService {
  createOrder(orderSummary: CreateOrderDTO): Promise<Result<IOrderResponseDTO>>;
  getOrders(): Promise<Result<Order[]>>;
  createOrderNotes(
    cartItems: CreateCartItemsDTO[],
    orderId: Types.ObjectId,
    audit: Audit,
  ): Promise<IOrderNoteResponseDTO[]>;
}
