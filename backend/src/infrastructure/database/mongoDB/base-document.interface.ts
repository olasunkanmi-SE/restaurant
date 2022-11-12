export interface IBaseDocument extends IAudit {
  readonly _id?: any;
}

export interface IAudit {
  readonly auditCreatedDateTime: string;
  readonly auditCreatedBy: string;
  auditModifiedBy?: string;
  auditModifiedDateTime?: string;
  auditDeletedBy?: string;
  auditDeletedDateTime?: string;
}
