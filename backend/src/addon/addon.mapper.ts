import { AuditMapper } from './../audit/audit.mapper';
import { CategoryMapper } from './../category/category.mapper';
import { IMapper } from './../domain/mapper/mapper';
import { Addon } from './addon';
import { AddonDataModel } from './addon.schema';
export class AddonMapper implements IMapper<Addon, AddonDataModel> {
  toPersistence(entity: Addon): AddonDataModel {
    const { name, description, audit, quantity, category, unitPrice } = entity;
    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    } = audit;
    return {
      _id: entity.id,
      name,
      description,
      quantity,
      unitPrice,
      category: new CategoryMapper().toPersistence(category),
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    };
  }

  toDomain(model: AddonDataModel): Addon {
    const { name, description, _id, quantity, category, unitPrice } = model;
    return Addon.create(
      {
        name,
        description,
        category: category ? new CategoryMapper().toDomain(category) : undefined,
        quantity,
        unitPrice,
        audit: new AuditMapper().toDomain(model),
      },
      _id,
    );
  }
}
