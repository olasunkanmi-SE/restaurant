import { Injectable } from '@nestjs/common';
import { Addon } from '../addon';
import { AuditMapper } from '../audit/audit.mapper';
import { IMapper } from '../domain/mapper/mapper';
import { ItemDataModel } from '../infrastructure/data_access/repositories/schemas/item.schema';
import { AddonMapper } from './../addon/addon.mapper';
import { AddonDataModel } from './../addon/addon.schema';
import { Item } from './item';

@Injectable()
export class ItemMapper implements IMapper<Item, ItemDataModel> {
  constructor(private readonly auditMapper: AuditMapper, private addonMapper: AddonMapper) {}
  toPersistence(entity: Item): ItemDataModel {
    const { addons } = entity;
    let mappedAddons: AddonDataModel[] = [];
    if (addons && addons.length) {
      mappedAddons = addons.map((addon) => this.addonMapper.toPersistence(addon));
    }
    const document: ItemDataModel = {
      _id: entity.id,
      name: entity.name,
      description: entity.description,
      portion: entity.portion,
      price: entity.price,
      quantity: entity.quantity,
      image: entity.image,
      tags: entity.tags,
      addons: mappedAddons,
      maximumPermitted: entity.maximumPermitted,
      taxRate: entity.taxRate,
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
    const { _id, name, description, price, portion, quantity, image, tags, maximumPermitted, taxRate, addons } = model;
    let addonsToDomain: Addon[] = [];
    if (addons && addons.length) {
      addonsToDomain = addons.map((addon) => this.addonMapper.toDomain(addon));
    }
    const entity: Item = Item.create(
      {
        name,
        description,
        portion,
        price,
        quantity,
        image,
        tags,
        maximumPermitted,
        taxRate,
        addons: addonsToDomain,
        audit: this.auditMapper.toDomain(model),
      },
      _id,
    ).getValue();
    return entity;
  }
}
