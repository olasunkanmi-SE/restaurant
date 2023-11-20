import { Result } from 'src/domain';
import { CreateOrderProcessingQueueDTO } from '../dto/create-order_processing_queue.dto';
import { OrderProcessingQueue } from '../order_processing_queue';

export interface IOrderProcessingQueueService {
  createOrderProcessingQueue(props: CreateOrderProcessingQueueDTO): Promise<OrderProcessingQueue>;
  getOrderProcessingQueues(): Promise<Result<OrderProcessingQueue[]>>;
}
