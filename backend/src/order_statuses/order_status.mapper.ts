import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/domain';
import { OrderStatus } from './order_status';
import { OrderStatusModel } from 'src/infrastructure/data_access/repositories/schemas/order-status.schema';
import { AuditMapper } from 'src/audit';

@Injectable()
export class orderStatusMapper implements IMapper<OrderStatus, OrderStatusModel> {
  constructor(private readonly auditMapper: AuditMapper) {}
  toPersistence(entity: OrderStatus): OrderStatusModel {
    const { id, isActive, name, code, description, audit } = entity;
    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    } = audit;
    const orderStatusDocument: OrderStatusModel = {
      _id: id,
      name,
      isActive,
      code,
      description,
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedDateTime,
      auditDeletedBy,
    };
    return orderStatusDocument;
  }

  toDomain(model: OrderStatusModel): OrderStatus {
    const { _id, isActive, name, code, description } = model;
    const entity: OrderStatus = OrderStatus.create(
      {
        name,
        code,
        description,
        isActive,
        audit: this.auditMapper.toDomain(model),
      },
      _id,
    );
    return entity;
  }
}
