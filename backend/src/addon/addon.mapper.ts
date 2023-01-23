import { AuditMapper } from './../audit/audit.mapper';
import { IMapper } from './../domain/mapper/mapper';
import { Addon } from './addon';
import { AddonDataModel } from './addon.schema';
export class AddonMapper implements IMapper<Addon, AddonDataModel> {
  toPersistence(entity: Addon): AddonDataModel {
    const { name, description, code, audit, quantity } = entity;
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
      code,
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
    const { name, description, code, _id, quantity } = model;
    return Addon.create({ name, description, code, quantity, audit: new AuditMapper().toDomain(model) }, _id);
  }
}
