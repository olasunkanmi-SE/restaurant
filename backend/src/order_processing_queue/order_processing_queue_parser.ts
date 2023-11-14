import { AuditParser } from '../audit/audit.parser';
import { IOrderProcessingQueueResponseDTO } from './dto/order-processing-queue.reponse';
import { OrderProcessingQueue } from './order_processing_queue';

export class OrderProcessingQueuewParser {
  static createResponse({ id, orderStatusId, orderId, audit }: OrderProcessingQueue): IOrderProcessingQueueResponseDTO {
    return { id, orderStatusId, orderId, ...AuditParser.createAuditResponse(audit) };
  }

  static createOrderStatusResponses(orderQueue: OrderProcessingQueue[]) {
    return orderQueue.map((queue) => {
      this.createResponse(queue);
    });
  }
}
