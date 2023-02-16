import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { BaseDocument } from '../../../../infrastructure/database';
import { ITemModel, portion } from '../models/item-model.interface';
import { Type } from 'class-transformer';
import { AddonDataModel } from '../../../../addon';

export type ItemDocument = ItemDataModel & Document;

@Schema({ versionKey: false })
export class ItemDataModel extends BaseDocument implements ITemModel {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String, required: true })
  portion: portion;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number })
  quantity: number;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: Array })
  tags: string[];

  @Prop({ type: Number, required: true })
  maximumPermitted: number;

  @Prop({ type: Number })
  taxRate: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: AddonDataModel.name }],
  })
  @Type(() => AddonDataModel)
  addons: AddonDataModel[];
}

export const ItemSchema = SchemaFactory.createForClass(ItemDataModel);
