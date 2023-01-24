import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { IAddonDataModel } from './../infrastructure/data_access/repositories/schemas/addon-model.interface';

export type AddonDocument = AddonDataModel & Document;

//Todo find the issue with the circular dependency error when extending BaseDocument
//TypeError: Class extends value undefined is not a constructor or null
@Schema({ versionKey: 'false' })
export class AddonDataModel implements IAddonDataModel {
  @Prop({ type: SchemaTypes.ObjectId })
  _id?: Types.ObjectId;

  @Prop({ type: String, required: true, immutable: true })
  auditCreatedDateTime: string;

  @Prop({ type: String, required: true, immutable: true })
  auditCreatedBy: string;

  @Prop({ type: String })
  auditModifiedBy?: string;

  @Prop({ type: String })
  auditModifiedDateTime?: string;

  @Prop({ type: Date })
  auditDeletedBy?: string;

  @Prop({ type: String })
  auditDeletedDateTime?: string;
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({ type: Number, required: true })
  quantity: number;
}

export const AddonSchema = SchemaFactory.createForClass(AddonDataModel);
