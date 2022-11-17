import { Result } from './../../../domain/result/result';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  Connection,
  Document,
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  SaveOptions,
  Types,
  UpdateQuery,
} from 'mongoose';
import { IGenericDocument } from './generic-document.interface';

export abstract class GenericDocumentRepository<T extends Document> implements IGenericDocument<T> {
  constructor(protected readonly DocumentModel: Model<T>, private readonly connection: Connection) {}

  async findOne(filterQuery: FilterQuery<T>, projection?: ProjectionType<T | null>): Promise<Result<T | null>> {
    const document = await this.DocumentModel.findOne(filterQuery, projection);
    if (!document) {
      return Result.fail('Error getting documents from database', HttpStatus.NOT_FOUND);
    }
    return Result.ok(document);
  }

  async findById(id: any, projection?: ProjectionType<T> | null): Promise<Result<T | null>> {
    const document = await this.DocumentModel.findById(id, projection);
    if (!document) {
      return Result.fail('Error getting documents from database', HttpStatus.NOT_FOUND);
    }
    return Result.ok(document);
  }

  async find(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T | null>,
    options?: QueryOptions<T>,
  ): Promise<Result<T[] | null>> {
    const documents = await this.DocumentModel.find(filterQuery, projection, options);
    if (!documents) {
      return Result.fail('Error getting documents from database', HttpStatus.NOT_FOUND);
    }
    return Result.ok(documents);
  }

  async create(document: any, options?: SaveOptions): Promise<Result<T>> {
    const doc = new this.DocumentModel({
      ...document,
      _id: new Types.ObjectId(),
    });
    const result = (await (await doc.save(options)).toJSON()) as T;
    if (!result) {
      return Result.fail('An Error occured, unable to save document in the db', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return Result.ok(result);
  }

  async findOneAndUpdate(filterQuery: FilterQuery<T>, update: UpdateQuery<T>): Promise<Result<T | null>> {
    const result = await this.DocumentModel.findByIdAndUpdate(filterQuery, update, {
      new: true,
    });
    if (!result) {
      return Result.fail('An Error occured, unable to update the database', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return Result.ok(result);
  }

  async upsert(filterQuery: FilterQuery<T>, document: Partial<T>): Promise<T | null> {
    const result = this.DocumentModel.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Unable to update the database',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return result;
  }

  async deleteMany(filterQuery: FilterQuery<T>): Promise<boolean> {
    const result = this.DocumentModel.deleteMany(filterQuery);
    return (await result).deletedCount >= 1;
  }

  async startTransaction(): Promise<void> {
    const session = await this.connection.startSession();
    return session.startTransaction();
  }
}
