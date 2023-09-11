import { BaseDocument } from 'src/infrastructure/database';
import { ISelectedCartItemDataModel } from '../models/selected-item-model.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { MenuDataModel } from './menu.schema';
import { CartItemDataModel } from './cartItem.schema';

export type SelectedCartItemDocument = SelectedCartItemDataModel & Document;

@Schema({ versionKey: 'false' })
export class SelectedCartItemDataModel extends BaseDocument implements ISelectedCartItemDataModel {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Type(() => MenuDataModel)
  menuId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Type(() => CartItemDataModel)
  itemId: Types.ObjectId;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  quantity: number;
}

export const SelectedCartItemSchema = SchemaFactory.createForClass(SelectedCartItemDataModel);
