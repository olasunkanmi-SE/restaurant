import { CreateOrderDTO } from '../dto/create-order.dto';
import { IOrderResponseDTO } from '../order-response.dto';

export interface IOrderService {
  createOrder(orderSummary: CreateOrderDTO): Promise<IOrderResponseDTO>;
}
