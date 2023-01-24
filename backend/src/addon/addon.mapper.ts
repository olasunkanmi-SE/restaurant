import { AuditMapper } from './../audit/audit.mapper';
import { IMapper } from './../domain/mapper/mapper';
import { Addon } from './addon';
import { AddonDataModel } from './addon.schema';
export class AddonMapper implements IMapper<Addon, AddonDataModel> {
  toPersistence(entity: Addon): AddonDataModel {
    const { name, description, audit, quantity } = entity;
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
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    };
  }

  toDomain(model: AddonDataModel): Addon {
    const { name, description, _id, quantity } = model;
    return Addon.create({ name, description, quantity, audit: new AuditMapper().toDomain(model) }, _id);
  }
}
