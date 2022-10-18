import { BaseDocument } from '../infrastructure/database/mongoDB/base-document';
import { Audit } from './../domain/audit/audit';
import { IMapper } from './../domain/mapper/mapper';
export class AuditMapper implements IMapper<Audit, BaseDocument> {
  toPersistence(entity: Audit): BaseDocument {
    const model = {
      auditCreatedBy: entity.auditCreatedBy,
      auditCreatedDateTime: entity.auditCreatedDateTime,
      auditModifiedBy: entity.auditModifiedBy,
      auditModifiedDateTime: entity.auditModifiedDateTime,
      auditDeletedDateTime: entity.auditDeletedDateTime,
      auditDeletedBy: entity.auditDeletedBy,
    };
    return model;
  }

  toDomain(doc: BaseDocument): Audit {
    const entity: Audit = Audit.create({
      auditCreatedBy: doc.auditCreatedBy,
      auditCreatedDateTime: doc.auditCreatedDateTime,
      auditModifiedBy: doc.auditModifiedBy,
      auditModifiedDateTime: doc.auditModifiedDateTime,
      auditDeletedDateTime: doc.auditDeletedDateTime,
      auditDeletedBy: doc.auditDeletedBy,
    }).getValue();
    return entity;
  }
}
