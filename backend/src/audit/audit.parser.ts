import { IAudit } from './../infrastructure/database/mongoDB/base-document.interface';

export class AuditParser {
  static createAuditResponse(model: any): IAudit | undefined {
    const auditResponse: IAudit = {
      auditCreatedBy: model.auditCreatedBy,
      auditCreatedDateTime: model.auditCreatedDateTime,
      auditModifiedBy: model.auditModifiedBy,
      auditModifiedDateTime: model.auditModifiedDateTime,
      auditDeletedDateTime: model.auditDeletedDateTime,
      auditDeletedBy: model.auditDeletedBy,
    };
    return auditResponse;
  }
}
