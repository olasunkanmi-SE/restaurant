import { Injectable } from '@nestjs/common';
import { Item } from '../item/item';
import { AuditMapper } from './../audit/audit.mapper';
import { CategoryMapper } from './../category/category.mapper';
import { IMapper } from './../domain/mapper/mapper';
import { ItemDataModel } from './../infrastructure/data_access/repositories/schemas/item.schema';
import { MenuDataModel } from './../infrastructure/data_access/repositories/schemas/menu.schema';
import { ItemMapper } from './../item/item.mapper';
import { Menu } from './menu';
import { Addon, AddonDataModel, AddonMapper } from '../addon';

@Injectable()
export class MenuMapper implements IMapper<Menu, MenuDataModel> {
  constructor(
    private readonly auditMapper: AuditMapper,
    private readonly itemMapper: ItemMapper,
    private readonly categoryMapper: CategoryMapper,
    private readonly addonMapper: AddonMapper,
  ) {}
  toPersistence(entity: Menu): MenuDataModel {
    const { items, name, description, audit, discount, imageUrl, basePrice, category, addons } = entity;
    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    } = audit;
    let itemsToPersistence: ItemDataModel[] = [];
    if (items && items.length) {
      itemsToPersistence = items.map((item) => this.itemMapper.toPersistence(item));
    }
    let addonsToPersistence: AddonDataModel[] = [];
    if (addons && addons.length) {
      addonsToPersistence = addons.map((addon) => this.addonMapper.toPersistence(addon));
    }
    const menuDocument: MenuDataModel = {
      _id: entity.id,
      name,
      description,
      discount,
      imageUrl,
      basePrice,
      category: this.categoryMapper.toPersistence(category),
      items: itemsToPersistence,
      addons: addonsToPersistence,
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
    const { _id, items, name, description, discount, imageUrl, basePrice, category, addons } = model;
    let itemsToDomain: Item[] = [];
    if (items && items.length) {
      itemsToDomain = items.map((item) => this.itemMapper.toDomain(item));
    }
    let addonsToDomain: Addon[] = [];
    if (addons && addons.length) {
      addonsToDomain = addons.map((addon) => this.addonMapper.toDomain(addon));
    }
    const entity: Menu = Menu.create(
      {
        items: itemsToDomain,
        addons: addonsToDomain,
        name,
        description,
        category: category ? this.categoryMapper.toDomain(category) : undefined,
        discount,
        imageUrl,
        basePrice,
        audit: this.auditMapper.toDomain(model),
      },
      _id,
    ).getValue();
    return entity;
  }
}
