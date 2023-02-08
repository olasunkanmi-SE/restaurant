import { Types } from 'mongoose';
import { Result } from './../domain/result/result';
import { ICategoryResponseDTO } from './category-response.dto';
import { CreateCategoryDTO } from './create-category.schema';
export interface ICategoryService {
  createCategory(props: CreateCategoryDTO): Promise<Result<ICategoryResponseDTO>>;
  getCategories(): Promise<Result<ICategoryResponseDTO[]>>;
  getCategoryById(id: Types.ObjectId): Promise<Result<ICategoryResponseDTO>>;
}
