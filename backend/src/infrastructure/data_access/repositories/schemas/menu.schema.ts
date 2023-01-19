import { Type } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { BaseDocument } from 'src/infrastructure/database';
import { IMenuData } from './../interfaces/menu-model.interface';
import { ItemDataModel } from './item.schema';

export type MenuDocument = MenuDataModel & Document;
@Schema({ versionKey: 'false' })
export class MenuDataModel extends BaseDocument implements IMenuData {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: ItemDataModel.name }])
  @Type(() => ItemDataModel)
  items: ItemDataModel[];
}

export const MenuSchema = SchemaFactory.createForClass(MenuDataModel);
