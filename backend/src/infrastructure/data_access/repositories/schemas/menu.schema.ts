import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { BaseDocument } from '../../../../infrastructure/database';
import { IMenuDataModel } from '../models/menu-model.interface';
import { AddonDataModel } from './../../../../addon/addon.schema';
import { CategoryDataModel } from './category.schema';
import { ItemDataModel } from './item.schema';

export type MenuDocument = MenuDataModel & Document;
@Schema({ versionKey: 'false' })
export class MenuDataModel extends BaseDocument implements IMenuDataModel {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({ type: String })
  imageUrl: string;

  @Prop({ type: Number, required: true, default: 0.0 })
  discount: number;

  @Prop({ type: Number, required: true, default: 0.0 })
  basePrice: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: CategoryDataModel.name })
  @Type(() => CategoryDataModel)
  category: CategoryDataModel;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: ItemDataModel.name }] })
  @Type(() => ItemDataModel)
  items: ItemDataModel[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: AddonDataModel.name }] })
  @Type(() => AddonDataModel)
  addons: AddonDataModel[];
}

export const MenuSchema = SchemaFactory.createForClass(MenuDataModel);

MenuSchema.virtual('itemDetails', {
  ref: ItemDataModel.name,
  localField: 'items',
  foreignField: '_id',
  justOne: false,
  autopopulate: true,
});

MenuSchema.virtual('addonDetails', {
  ref: AddonDataModel.name,
  localField: 'addons',
  foreignField: '_id',
  justOne: false,
  autopopulate: true,
});
