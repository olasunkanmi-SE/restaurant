import { Injectable } from '@nestjs/common';
import { AuditMapper } from './../audit/audit.mapper';
import { IMapper } from './../domain/mapper/mapper';
import { OrderManagerDataModel } from './../infrastructure/data_access/repositories/schemas/order-manger.schema';
import { MerchantMapper } from './../merchant/merchant.mapper';
import { OrderManager } from './order.manager';

@Injectable()
export class OrderManagerMapper implements IMapper<OrderManager, OrderManagerDataModel> {
  constructor(private readonly merchantMapper: MerchantMapper, private readonly auditMapper: AuditMapper) {}
  toPersistence(entity: OrderManager): OrderManagerDataModel {
    const { firstName, lastName, email, phoneNumber, merchant, role, audit, password } = entity;
    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    } = audit;
    const orderManagerDocument: OrderManagerDataModel = {
      _id: entity.id,
      firstName,
      lastName,
      email,
      phoneNumber,
      merchant: this.merchantMapper.toPersistence(merchant),
      role,
      password,
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    };
    return orderManagerDocument;
  }

  toDomain(model: OrderManagerDataModel): OrderManager {
    const { _id, firstName, lastName, email, phoneNumber, merchant, role, password } = model;
    const orderManagerEntity: OrderManager = OrderManager.create(
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        merchant: this.merchantMapper.toDomain(merchant),
        role,
        audit: this.auditMapper.toDomain(model),
        password,
      },
      _id,
    ).getValue();
    return orderManagerEntity;
  }
}
