import { ICategoryResponseDTO } from './category-response.dto';
import { Result } from './../domain/result/result';
import { createCategoryDTO } from './create-category.schema';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { TYPES } from './../application/constants/types';
import { ICategoryService } from './category-service.interface';
import { Types } from 'mongoose';

@Controller('categories')
export class CategoryController {
  constructor(@Inject(TYPES.ICategoryService) private readonly categoryService: ICategoryService) {}

  @Post()
  async createCategory(@Body() request: createCategoryDTO): Promise<Result<ICategoryResponseDTO>> {
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
}
