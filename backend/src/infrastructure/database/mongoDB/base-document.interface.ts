export interface IBaseDocument {
  readonly _id: any;
  readonly auditCreatedDateTime: Date;
  readonly auditCreatedBy: string;
  readonly auditModifiedBy: string;
  readonly auditModifiedDateTime?: Date;
  readonly auditDeletedBy?: string;
  readonly auditDeletedDateTime?: Date;
}
