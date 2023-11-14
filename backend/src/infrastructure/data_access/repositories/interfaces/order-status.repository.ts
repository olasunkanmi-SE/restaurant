import { OrderStatusModel } from 'src/infrastructure/data_access/repositories/schemas/order-status.schema';
import { Result } from 'src/domain';
import { IGenericDocument } from 'src/infrastructure/database';
import { OrderStatus } from 'src/order_statuses/order_status';

export interface IOrderStatusRespository extends IGenericDocument<OrderStatus, OrderStatusModel> {
  createOrderStatus(status: OrderStatus): Promise<Result<OrderStatus>>;
}
