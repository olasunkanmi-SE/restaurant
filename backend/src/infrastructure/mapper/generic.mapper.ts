import { IMapper } from './../../domain/mapper/mapper';
export class GenericMapper<TEntity, TModel> implements IMapper<TEntity, TModel> {
  toPersistence(entity: any): TModel {
    const obj = new Object() as TModel as any;
    let audit: any = {};
    Object.entries(entity).forEach(([key, value]) => {
      if (key === '_audit') {
        audit = value;
      }
      if (key === '_id') {
        key = 'id';
      }
      if (key.includes('_')) {
        key = key.replace('_', '');
      }
      obj[key] = value;
    });
    Object.entries(audit.props).forEach(([key, value]) => {
      obj[key] = value;
    });
    delete obj.audit;
    return obj;
  }

  toDomain(model: any): TEntity {
    return model as TEntity;
  }
}
