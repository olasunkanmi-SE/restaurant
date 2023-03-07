import { MenuMapper } from './../menu/menu.mapper';
import { Injectable } from '@nestjs/common';
import { AuditMapper } from '../audit/audit.mapper';
import { IMapper } from '../domain/mapper/mapper';
import { ItemDataModel } from '../infrastructure/data_access/repositories/schemas/item.schema';
import { Item } from './item';

@Injectable()
export class ItemMapper implements IMapper<Item, ItemDataModel> {
  private menuMapper: MenuMapper;
  constructor(private readonly auditMapper: AuditMapper) {}
  toPersistence(entity: Item): ItemDataModel {
    const { id, name, description, price, maximumPermitted } = entity;
    const document: ItemDataModel = {
      _id: id,
      name,
      description,
      price,
      maximumPermitted,
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
    const { _id, name, description, price, maximumPermitted } = model;
    const entity: Item = Item.create(
      {
        name,
        price,
        description,
        maximumPermitted,
        audit: this.auditMapper.toDomain(model),
      },
      _id,
    ).getValue();
    return entity;
  }
}
