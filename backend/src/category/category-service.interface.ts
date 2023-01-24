import { Types } from 'mongoose';
import { Result } from './../domain/result/result';
import { ICategoryResponseDTO } from './category-response.dto';
import { createCategoryDTO } from './create-category.schema';
export interface ICategoryService {
  createCategory(props: createCategoryDTO): Promise<Result<ICategoryResponseDTO>>;
  getCategories(): Promise<Result<ICategoryResponseDTO[]>>;
  getCategoryById(id: Types.ObjectId): Promise<Result<ICategoryResponseDTO>>;
}
