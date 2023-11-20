import { Result } from 'src/domain';
import { CreateOrderProcessingQueueDTO } from '../dto/create-order_processing_queue.dto';
import { OrderProcessingQueue } from '../order_processing_queue';

export interface IOrderProcessingQueueService {
  createQueue(props: CreateOrderProcessingQueueDTO): Promise<OrderProcessingQueue>;
  getOrderStatusQueues(): Promise<Result<OrderProcessingQueue[]>>;
}
