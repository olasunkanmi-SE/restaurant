import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseDocument } from '../../../../infrastructure/database';
import { ITemModel } from '../models/item-model.interface';

export type ItemDocument = ItemDataModel & Document;

@Schema({ versionKey: false })
export class ItemDataModel extends BaseDocument implements ITemModel {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number })
  quantity: number;

  @Prop({ type: Number, required: true })
  maximumPermitted: number;
}

export const ItemSchema = SchemaFactory.createForClass(ItemDataModel);
