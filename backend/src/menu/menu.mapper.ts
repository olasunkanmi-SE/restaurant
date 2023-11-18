import { Injectable } from '@nestjs/common';
import { Item } from '../item/item';
import { AuditMapper } from './../audit/audit.mapper';
import { CategoryMapper } from './../category/category.mapper';
import { IMapper } from './../domain/mapper/mapper';
import { ItemDataModel } from './../infrastructure/data_access/repositories/schemas/item.schema';
import { MenuDataModel } from './../infrastructure/data_access/repositories/schemas/menu.schema';
import { ItemMapper } from './../item/item.mapper';
import { Menu } from './menu';

@Injectable()
export class MenuMapper implements IMapper<Menu, MenuDataModel> {
  constructor(
    private readonly auditMapper: AuditMapper,
    private readonly itemMapper: ItemMapper,
    private readonly categoryMapper: CategoryMapper,
  ) {}
  toPersistence(entity: Menu): MenuDataModel {
    const { items, name, description, audit, discount, imageUrl, basePrice, category, restaurantId, note } = entity;
    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    } = audit;
    let itemsToPersistence: ItemDataModel[] = [];
    if (items?.length) {
      itemsToPersistence = items.map((item) => this.itemMapper.toPersistence(item));
    }
    const menuDocument: MenuDataModel = {
      _id: entity.id,
      name,
      description,
      discount,
      imageUrl,
      basePrice,
      note,
      restaurantId,
      category: this.categoryMapper.toPersistence(category),
      items: itemsToPersistence,
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
    const { _id, items, name, description, discount, imageUrl, basePrice, category, restaurantId, note } = model;
    let itemsToDomain: Item[] = [];
    if (items?.length) {
      itemsToDomain = items.map((item) => this.itemMapper.toDomain(item));
    }
    const entity: Menu = Menu.create(
      {
        items: itemsToDomain,
        name,
        restaurantId,
        description,
        category: category ? this.categoryMapper.toDomain(category) : undefined,
        discount,
        imageUrl,
        basePrice,
        note,
        audit: this.auditMapper.toDomain(model),
      },
      _id,
    ).getValue();
    return entity;
  }
}
