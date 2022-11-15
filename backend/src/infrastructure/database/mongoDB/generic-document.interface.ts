import { Result } from './../../../domain/result/result';
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
  ): Promise<Result<T | null>>;

  findById(
    id: any,
    projection?: ProjectionType<T> | null,
  ): Promise<Result<T | null>>;

  find(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T | null>,
    options?: QueryOptions<T>,
  ): Promise<Result<T[] | null>>;

  create(document: any, options?: SaveOptions): Promise<Result<T>>;

  findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<Result<T | null>>;

  upsert(filterQuery: FilterQuery<T>, document: Partial<T>): Promise<T | null>;

  deleteMany(filterQuery: FilterQuery<T>): Promise<boolean>;

  startTransaction(): Promise<void>;
}
