import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  SaveOptions,
  UpdateQuery,
} from 'mongoose';

export interface IGenericDocument<T> {
  findOne(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T | null>,
  ): Promise<T | null>;

  find(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T | null>,
    options?: QueryOptions<T>,
  ): Promise<T[] | null>;

  create(document: any, options?: SaveOptions): Promise<T>;

  findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<T | null>;

  upsert(filterQuery: FilterQuery<T>, document: Partial<T>): Promise<T | null>;

  deleteMany(filterQuery: FilterQuery<T>): Promise<boolean>;

  startTransaction(): Promise<void>;
}
