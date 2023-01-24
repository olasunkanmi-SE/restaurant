import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { GenericDocumentRepository } from '../../../infrastructure/database';
import { Category } from './../../../category/category';
import { CategoryMapper } from './../../../category/category.mapper';
import { CategoryDataModel, CategoryDocument } from './schemas/category.schema';

export class CategoryRepository extends GenericDocumentRepository<Category, CategoryDocument> {
  constructor(
    @InjectModel(CategoryDataModel.name) itemModel: Model<CategoryDocument>,
    @InjectConnection() connection: Connection,
    categoryMapper: CategoryMapper,
  ) {
    super(itemModel, connection, categoryMapper);
  }
}
