import { ICategoryResponseDTO } from './category-response.dto';
import { CategoryParser } from './category.parser';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CategoryDataModel } from '../infrastructure/data_access/repositories/schemas/category.schema';
import { Context } from '../infrastructure';
import { TYPES } from './../application/constants/types';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { IContextService } from './../infrastructure/context/context-service.interface';
import { CategoryRepository } from './../infrastructure/data_access/repositories/category.repository';
import { throwApplicationError } from './../infrastructure/utilities/exception-instance';
import { IMerchantService } from './../merchant/interface/merchant-service.interface';
import { Category } from './category';
import { ICategoryService } from './category-service.interface';
import { CategoryMapper } from './category.mapper';
import { CreateCategoryDTO } from './create-category.schema';
import { Types } from 'mongoose';

@Injectable()
export class CategoryService implements ICategoryService {
  private context: Context;
  constructor(
    @Inject(TYPES.IContextService) private readonly contextService: IContextService,
    @Inject(TYPES.IMerchantService) private readonly merchantService: IMerchantService,
    private readonly categoryRepository: CategoryRepository,
    private readonly categoryMapper: CategoryMapper,
  ) {
    this.context = this.contextService.getContext();
  }
  async createCategory(props: CreateCategoryDTO): Promise<Result<ICategoryResponseDTO>> {
    const { name } = props;
    const code = name.toUpperCase();
    await this.merchantService.validateContext();
    const existingItem = await this.categoryRepository.findOne({ name });
    if (existingItem.isSuccess) {
      throwApplicationError(HttpStatus.BAD_REQUEST, `Item ${name} already exists`);
    }

    const context: Context = await this.context;
    const audit: Audit = Audit.createInsertContext(context);
    const category: Category = Category.create({ ...props, audit, code }).getValue();
    const categoryModel: CategoryDataModel = this.categoryMapper.toPersistence(category);
    const result: Result<Category> = await this.categoryRepository.create(categoryModel);
    if (!result.isSuccess) {
      throwApplicationError(HttpStatus.SERVICE_UNAVAILABLE, 'Error while creating item, please try again later');
    }
    const response = CategoryParser.createCategoryResponse(result.getValue());
    return Result.ok(response);
  }

  async getCategories(): Promise<Result<ICategoryResponseDTO[]>> {
    await this.merchantService.validateContext();
    const result: Result<Category[]> = await this.categoryRepository.find({});
    const response: ICategoryResponseDTO[] = CategoryParser.createCategoriesResponse(result.getValue());
    return Result.ok(response);
  }

  async getCategoryById(id: Types.ObjectId): Promise<Result<ICategoryResponseDTO>> {
    await this.merchantService.validateContext();
    const result: Result<Category> = await this.categoryRepository.findById(id);
    const response: ICategoryResponseDTO = CategoryParser.createCategoryResponse(result.getValue());
    return Result.ok(response);
  }
}
