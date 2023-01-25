import { AuditMapper } from './../audit/audit.mapper';
import { CategoryMapper } from './../category/category.mapper';
import { IMapper } from './../domain/mapper/mapper';
import { Addon } from './addon';
import { AddonDataModel } from './addon.schema';
export class AddonMapper implements IMapper<Addon, AddonDataModel> {
  constructor(private readonly auditMapper: AuditMapper) {}
  toPersistence(entity: Addon): AddonDataModel {
    const { name, description, audit, quantity, category } = entity;
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
      category: new CategoryMapper(this.auditMapper).toPersistence(category),
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    };
  }

  toDomain(model: AddonDataModel): Addon {
    const { name, description, _id, quantity, category } = model;
    return Addon.create(
      {
        name,
        description,
        category: new CategoryMapper(this.auditMapper).toDomain(category),
        quantity,
        audit: new AuditMapper().toDomain(model),
      },
      _id,
    );
  }
}
