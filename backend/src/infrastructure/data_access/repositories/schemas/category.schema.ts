import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseDocument } from '../../../../infrastructure/database';
import { ICategoryModel } from '../interfaces/category-model.iterface';

export type CategoryDocument = CategoryDataModel & Document;

@Schema({ versionKey: false })
export class CategoryDataModel extends BaseDocument implements ICategoryModel {
  @Prop({ type: String, required: true, unique: true })
  name: string;
  @Prop({ type: String, required: true, unique: true })
  code: string;
  @Prop({ type: String })
  description?: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryDataModel);
