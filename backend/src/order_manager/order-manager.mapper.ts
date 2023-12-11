import { Injectable } from '@nestjs/common';
import { AuditMapper } from './../audit/audit.mapper';
import { IMapper } from './../domain/mapper/mapper';
import { OrderManagerDataModel } from './../infrastructure/data_access/repositories/schemas/order-manger.schema';
import { SingleClientMapper } from './../singleclient/singleclient.mapper';
import { OrderManager } from './order.manager';

@Injectable()
export class OrderManagerMapper implements IMapper<OrderManager, OrderManagerDataModel> {
  constructor(private readonly singleclientMapper: SingleClientMapper, private readonly auditMapper: AuditMapper) {}
  toPersistence(entity: OrderManager): OrderManagerDataModel {
    const { firstName, lastName, email, phoneNumber, singleclient, role, audit, password } = entity;
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
      singleclient: this.singleclientMapper.toPersistence(singleclient),
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
    const { _id, firstName, lastName, email, phoneNumber, singleclient, role, password } = model;
    const orderManagerEntity: OrderManager = OrderManager.create(
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        singleclient: this.singleclientMapper.toDomain(singleclient),
        role,
        audit: this.auditMapper.toDomain(model),
        password,
      },
      _id,
    ).getValue();
    return orderManagerEntity;
  }
}
