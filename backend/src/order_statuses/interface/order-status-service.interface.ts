import { Result } from 'src/domain';
import { CreateOrderStatusDto } from '../dto/create-order_status.dto';
import { OrderStatus } from '../order_status';
import { IOrderStatusResponseDTO } from '../dto/order-status-response';

export interface IOrderStatusService {
  createOrderStatus(props: CreateOrderStatusDto): Promise<Result<IOrderStatusResponseDTO>>;
  getOrderStatuses(): Promise<Result<OrderStatus[]>>;
}
