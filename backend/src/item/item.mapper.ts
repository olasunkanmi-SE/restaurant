import { Injectable } from '@nestjs/common';
import { AuditMapper } from '../audit/audit.mapper';
import { IMapper } from '../domain/mapper/mapper';
import { ItemDataModel } from '../infrastructure/data_access/repositories/schemas/item.schema';
import { Item } from './item';

@Injectable()
export class ItemMapper implements IMapper<Item, ItemDataModel> {
  constructor(private readonly auditMapper: AuditMapper) {}
  toPersistence(entity: Item): ItemDataModel {
    const document: ItemDataModel = {
      _id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      quantity: entity.quantity,
      maximumPermitted: entity.maximumPermitted,
      auditCreatedBy: entity.audit.auditCreatedBy,
      auditCreatedDateTime: entity.audit.auditCreatedDateTime,
      auditModifiedBy: entity.audit.auditModifiedBy,
      auditModifiedDateTime: entity.audit.auditModifiedDateTime,
      auditDeletedDateTime: entity.audit.auditDeletedDateTime,
      auditDeletedBy: entity.audit.auditDeletedBy,
    };
    return document;
  }
  toDomain(model: ItemDataModel): Item {
    const { _id, name, description, price, quantity, maximumPermitted } = model;
    const entity: Item = Item.create(
      {
        name,
        price,
        description,
        quantity,
        maximumPermitted,
        audit: this.auditMapper.toDomain(model),
      },
      _id,
    ).getValue();
    return entity;
  }
}
