import { AuditMapper } from './../audit/audit.mapper';
import { IMapper } from './../domain/mapper/mapper';
import { Addon } from './addon';
import { AddonDataModel } from './addon.schema';
export class AddonMapper implements IMapper<Addon, AddonDataModel> {
  constructor(private readonly auditMapper: AuditMapper) {}
  toPersistence(entity: Addon): AddonDataModel {
    const { category, description, code, audit } = entity;
    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    } = audit;
    return {
      category,
      description,
      code,
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    };
  }

  toDomain(model: AddonDataModel): Addon {
    const { category, description, code, _id } = model;
    return Addon.create({ category, description, code, audit: this.auditMapper.toDomain(model) }, _id);
  }
}
