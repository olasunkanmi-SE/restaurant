import { BaseDocument } from 'src/infrastructure';
import { IAddonDataModel } from './../infrastructure/data_access/repositories/schemas/addon-model.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddonDocument = AddonDataModel & Document;

@Schema({ versionKey: 'false' })
export class AddonDataModel extends BaseDocument implements IAddonDataModel {
  @Prop({ type: String, required: true })
  category: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({ type: String, required: true, unique: true })
  code: string;
}

export const AddonSchema = SchemaFactory.createForClass(AddonDataModel);
