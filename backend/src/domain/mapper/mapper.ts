export interface IMapper<TEntity, TModel> {
  toPersistence(entity: TEntity): TModel;
  toDomain(model: TModel): TEntity;
}
