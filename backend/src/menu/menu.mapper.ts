import { Injectable } from '@nestjs/common';
import { Item } from '../item/item';
import { AuditMapper } from './../audit/audit.mapper';
import { IMapper } from './../domain/mapper/mapper';
import { ItemDataModel } from './../infrastructure/data_access/repositories/schemas/item.schema';
import { MenuDataModel } from './../infrastructure/data_access/repositories/schemas/menu.schema';
import { ItemMapper } from './../item/item.mapper';
import { Menu } from './menu';

@Injectable()
export class MenuMapper implements IMapper<Menu, MenuDataModel> {
  constructor(private readonly auditMapper: AuditMapper, private readonly itemMapper: ItemMapper) {}
  toPersistence(entity: Menu): MenuDataModel {
    const { items, name, description, audit, discount } = entity;
    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    } = audit;
    let mappedItems: ItemDataModel[] = [];
    if (items && items.length) {
      mappedItems = items.map((item) => this.itemMapper.toPersistence(item));
    }
    const menuDocument: MenuDataModel = {
      _id: entity.id,
      name,
      description,
      discount,
      items: mappedItems,
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedDateTime,
      auditDeletedBy,
    };
    return menuDocument;
  }

  toDomain(model: MenuDataModel): Menu {
    const { _id, items, name, description, discount } = model;
    let itemsToDomain: Item[] = [];
    if (items && items.length) {
      itemsToDomain = items.map((item) => this.itemMapper.toDomain(item));
    }
    const entity: Menu = Menu.create(
      { items: itemsToDomain, name, description, discount, audit: this.auditMapper.toDomain(model) },
      _id,
    ).getValue();
    return entity;
  }
}
