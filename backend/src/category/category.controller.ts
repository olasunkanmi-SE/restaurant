import { ICategoryResponseDTO } from './category-response.dto';
import { Result } from './../domain/result/result';
import { CreateCategoryDTO } from './create-category.schema';
import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { TYPES } from './../application/constants/types';
import { ICategoryService } from './category-service.interface';
import { Types } from 'mongoose';

@Controller('categories')
export class CategoryController {
  constructor(@Inject(TYPES.ICategoryService) private readonly categoryService: ICategoryService) {}

  @Post()
  async createCategory(@Body() request: CreateCategoryDTO): Promise<Result<ICategoryResponseDTO>> {
    return await this.categoryService.createCategory(request);
  }

  @Get()
  async getCategories(): Promise<Result<ICategoryResponseDTO[]>> {
    return await this.categoryService.getCategories();
  }

  @Get('/:id')
  async getCategory(@Param('id') categoryId: Types.ObjectId): Promise<Result<ICategoryResponseDTO>> {
    return await this.categoryService.getCategoryById(categoryId);
  }

  @Delete()
  async deleteCategories(@Body() request: { ids: string[] }): Promise<Result<boolean>> {
    return await this.categoryService.deleteCategories(request.ids);
  }
}
