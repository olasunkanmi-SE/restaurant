import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/domain';
import { OrderDataModel } from 'src/infrastructure/data_access/repositories/schemas/order.schema';
import { Order } from './order';
import { AuditMapper } from 'src/audit';

@Injectable()
export class OrderMapper implements IMapper<Order, OrderDataModel> {
  constructor(private readonly auditMapper: AuditMapper) {}
  toPersistence(entity: Order): OrderDataModel {
    const { id, state, type, merchantId, total, quantity, discount, orderManagerId, audit } = entity;
    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    } = audit;
    const orderDocument: OrderDataModel = {
      _id: id,
      state,
      type,
      merchantId,
      total,
      quantity,
      discount,
      orderManagerId,
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedDateTime,
      auditDeletedBy,
    };
    return orderDocument;
  }

  toDomain(model: OrderDataModel): Order {
    const { state, type, merchantId, total, quantity, discount, orderManagerId, _id } = model;
    const entity: Order = Order.create(
      { state, type, merchantId, total, quantity, discount, orderManagerId, audit: this.auditMapper.toDomain(model) },
      _id,
    ).getValue();
    return entity;
  }
}
