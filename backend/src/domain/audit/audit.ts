import { Result } from '../result';
import { ValueObjects } from '../value-objects/value-object';
import { Context } from './../../infrastructure/context/context';
import { IAudit } from './../../infrastructure/database/mongoDB/base-document.interface';

export class Audit extends ValueObjects<IAudit> {
  get auditCreatedDateTime(): string {
    return this.props.auditCreatedDateTime;
  }

  get auditCreatedBy(): string {
    return this.props.auditCreatedBy;
  }

  get auditModifiedBy(): string {
    return this.props.auditModifiedBy;
  }

  set auditModifiedBy(email: string) {
    this.props.auditModifiedBy = email;
  }

  get auditModifiedDateTime(): string {
    return this.props.auditModifiedDateTime;
  }

  set auditModifiedDateTime(date: string) {
    this.props.auditModifiedDateTime = date;
  }

  get auditDeletedBy(): string {
    return this.props.auditDeletedBy;
  }

  set auditDeletedBy(email: string) {
    this.props.auditDeletedBy = email;
  }

  get auditDeletedDateTime(): string {
    return this.props.auditDeletedDateTime;
  }

  set auditDeletedDateTime(date: string) {
    this.props.auditDeletedDateTime = date;
  }

  static create(props: IAudit): Result<Audit> {
    return Result.ok(new Audit(props));
  }

  static createInsertContext(context: Context): Audit {
    const audit: IAudit = {
      auditCreatedDateTime: new Date().toISOString(),
      auditCreatedBy: context.email,
    };
    return Audit.create(audit).getValue();
  }

  static updateContext(email: string, entity: any): Audit {
    const audit: IAudit = {
      auditCreatedDateTime: entity.auditCreatedDateTime,
      auditCreatedBy: entity.auditCreatedBy,
      auditModifiedBy: email,
      auditModifiedDateTime: new Date().toISOString(),
    };
    return Audit.create(audit).getValue();
  }
}
