import { Result } from 'src/domain';
import { CreateOrderProcessingQueueDTO } from '../dto/create-order_processing_queue.dto';
import { IOrderProcessingQueueResponseDTO } from '../dto/order-processing-queue.reponse';
import { OrderProcessingQueue } from '../order_processing_queue';

export interface IOrderProcessingQueueService {
  createOrderProcessingQueue(props: CreateOrderProcessingQueueDTO): Promise<Result<IOrderProcessingQueueResponseDTO>>;
  getOrderProcessingQueues(): Promise<Result<OrderProcessingQueue[]>>;
}
