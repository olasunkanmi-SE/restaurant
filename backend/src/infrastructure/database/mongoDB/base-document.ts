import { Prop } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { IBaseDocument } from './base-document.interface';

export abstract class BaseDocument implements IBaseDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: Date, required: true })
  auditCreatedDateTime: Date;

  @Prop({ type: String, required: true })
  auditCreatedBy: string;

  @Prop({ type: String })
  auditModifiedBy: string;

  @Prop({ type: Date })
  auditModifiedDateTime?: Date;

  @Prop({ type: Date })
  auditDeletedBy?: string;

  @Prop({ type: Date })
  auditDeletedDateTime?: Date;
}
