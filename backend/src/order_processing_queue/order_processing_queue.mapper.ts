import { Injectable } from '@nestjs/common';
import { AuditMapper } from 'src/audit';
import { IMapper } from 'src/domain';
import { OrderProcessingQueue } from './order_processing_queue';
import { OrderProcessingQueueModel } from 'src/infrastructure/data_access/repositories/schemas/order-processing-queue.schema';

@Injectable()
export class OrderProcessingQueueMapper implements IMapper<OrderProcessingQueue, OrderProcessingQueueModel> {
  constructor(private readonly auditMapper: AuditMapper) {}
  toPersistence(entity: OrderProcessingQueue): OrderProcessingQueueModel {
    const { id, orderId, orderStatusId, audit } = entity;
    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    } = audit;
    const OrderProcessingQueueDocument: OrderProcessingQueueModel = {
      _id: id,
      orderId,
      orderStatusId,
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedDateTime,
      auditDeletedBy,
    };
    return OrderProcessingQueueDocument;
  }

  toDomain(model: OrderProcessingQueueModel): OrderProcessingQueue {
    const { _id, orderId, orderStatusId } = model;
    const entity: OrderProcessingQueue = OrderProcessingQueue.create(
      {
        orderId,
        orderStatusId,
        audit: this.auditMapper.toDomain(model),
      },
      _id,
    );
    return entity;
  }
}
