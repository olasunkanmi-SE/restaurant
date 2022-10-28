import { Audit } from './../domain/audit/audit';
import { IAudit } from './../infrastructure/database/mongoDB/base-document.interface';

export class AuditParser {
  static createAuditResponse(audit: Audit): IAudit {
    const auditResponse: IAudit = {
      auditCreatedBy: audit.auditCreatedBy,
      auditCreatedDateTime: audit.auditCreatedDateTime,
      auditModifiedBy: audit.auditModifiedBy,
      auditModifiedDateTime: audit.auditModifiedDateTime,
      auditDeletedDateTime: audit.auditDeletedDateTime,
      auditDeletedBy: audit.auditDeletedBy,
    };
    return auditResponse;
  }
}
