import { Injectable } from '@nestjs/common';
import { AuditParser } from './../audit/audit.parser';
import { Category } from './category';
import { ICategoryResponseDTO } from './category-response.dto';

@Injectable()
export class CategoryParser {
  static createCategoryResponse(category: Category): ICategoryResponseDTO {
    const { name, description, code, id } = category;
    const categoryResponse: ICategoryResponseDTO = {
      id,
      name,
      description,
      code,
      ...AuditParser.createAuditResponse(category.audit),
    };
    return categoryResponse;
  }

  static createCategoriesResponse(categories: Category[]): ICategoryResponseDTO[] {
    return categories.map((category) => CategoryParser.createCategoryResponse(category));
  }
}
