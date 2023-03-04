import { Injectable } from '@nestjs/common';
import { AuditMapper } from './../audit/audit.mapper';
import { IMapper } from './../domain/mapper/mapper';
import { CategoryDataModel } from './../infrastructure/data_access/repositories/schemas/category.schema';
import { Category } from './category';

@Injectable()
export class CategoryMapper implements IMapper<Category, CategoryDataModel> {
  toPersistence(entity: Category): CategoryDataModel {
    const { name, description, code, id, audit } = entity;
    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedDateTime,
      auditDeletedBy,
    } = audit;
    return {
      _id: id,
      name,
      description,
      code,
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedDateTime,
      auditDeletedBy,
    };
  }

  toDomain(model: CategoryDataModel): Category {
    const { _id, name, code, description } = model;
    const entity: Category = Category.create(
      { name, code, description, audit: new AuditMapper().toDomain(model) },
      _id,
    ).getValue();
    return entity;
  }
}
