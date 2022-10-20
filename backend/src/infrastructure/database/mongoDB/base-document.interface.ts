export interface IBaseDocument extends IAudit {
  readonly _id?: any;
}

export interface IAudit {
  readonly auditCreatedDateTime: Date;
  readonly auditCreatedBy: string;
  readonly auditModifiedBy?: string;
  readonly auditModifiedDateTime?: Date;
  readonly auditDeletedBy?: string;
  readonly auditDeletedDateTime?: Date;
}
