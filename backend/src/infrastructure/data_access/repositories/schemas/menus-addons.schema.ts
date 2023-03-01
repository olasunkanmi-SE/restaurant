import { Prop, Schema } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { AddonDataModel } from '../../../../addon';
import { BaseDocument } from '../../../../infrastructure/database';
import { IMenuAddonModel } from '../models/menus-addons.interface';
import { MenuDataModel } from './menu.schema';

@Schema({ versionKey: 'false' })
export class MenusAddonsSchema extends BaseDocument implements IMenuAddonModel {
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: MenuDataModel.name }])
  @Type(() => MenuDataModel)
  menu: MenuDataModel;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: AddonDataModel.name }])
  @Type(() => AddonDataModel)
  addon: AddonDataModel;
}
