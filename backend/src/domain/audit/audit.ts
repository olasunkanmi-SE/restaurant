import { IAudit } from './../../infrastructure/database/mongoDB/base-document.interface';
import { Result } from '../result';
import { ValueObjects } from '../value-objects/value-object';

export class Audit extends ValueObjects<IAudit> {
  get auditCreatedDateTime(): Date {
    return this.props.auditCreatedDateTime;
  }

  get auditCreatedBy(): string {
    return this.props.auditCreatedBy;
  }

  get auditModifiedBy(): string {
    return this.props.auditModifiedBy;
  }

  get auditModifiedDateTime(): Date {
    return this.props.auditModifiedDateTime;
  }

  get auditDeletedBy(): string {
    return this.props.auditDeletedBy;
  }

  get auditDeletedDateTime(): Date {
    return this.props.auditDeletedDateTime;
  }

  static create(props: IAudit): Result<Audit> {
    return Result.ok(new Audit(props));
  }

  static createInsertContext(): Audit {
    const audit: IAudit = {
      auditCreatedDateTime: new Date(),
      auditCreatedBy: 'Ola',
    };
    return Audit.create(audit).getValue();
  }
}
