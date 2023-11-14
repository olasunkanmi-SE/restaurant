import { Result } from 'src/domain';
import { IGenericDocument } from 'src/infrastructure/database';
import { OrderProcessingQueue } from 'src/order_processing_queue/order_processing_queue';
import { OrderProcessingQueueDocument } from '../schemas/order-processing-queue.schema';

export interface IOrderProcessingQueueRespository
  extends IGenericDocument<OrderProcessingQueue, OrderProcessingQueueDocument> {
  createOrderProcessingQueue(note: OrderProcessingQueue): Promise<Result<OrderProcessingQueue>>;
}
