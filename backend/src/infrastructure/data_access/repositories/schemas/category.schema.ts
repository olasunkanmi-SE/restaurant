import { BaseDocument } from 'src/infrastructure/database';
import { ICategoryModel } from '../interfaces/category-model.iterface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
