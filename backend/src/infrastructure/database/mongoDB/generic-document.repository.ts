import { HttpStatus } from '@nestjs/common';
import {
  ClientSession,
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
import { Result } from './../../../domain/result/result';
import { IGenericDocument } from './generic-document.interface';
import { throwApplicationError } from 'src/infrastructure/utilities/exception-instance';

export abstract class GenericDocumentRepository<TEntity, T extends Document> implements IGenericDocument<TEntity, T> {
  constructor(
    protected readonly DocumentModel: Model<T>,
    readonly connection: Connection,
    private readonly mapper: any,
  ) {}

  public static createObjectId() {
    return new Types.ObjectId();
  }

  private convertObjectIdToString(objectId: Types.ObjectId) {
    return objectId.toString();
  }

  public objectIdToString(objectId: Types.ObjectId): string {
    return this.convertObjectIdToString(objectId);
  }

  public stringToObjectId(prop: string): Types.ObjectId {
    return this.convertStringToObjectId(prop);
  }

  private convertStringToObjectId(prop: string) {
    return new Types.ObjectId(prop);
  }

  async count(query: FilterQuery<T>, limit?: number): Promise<number> {
    return this.DocumentModel.countDocuments(query, { limit });
  }
  async aggregate(
    query: any[],
    options: { readPeference?: 'secondaryPreferred' | 'primaryPreferred' } = {},
  ): Promise<any> {
    return await this.DocumentModel.aggregate(query).read(options.readPeference || 'primary');
  }

  async findOne(filterQuery: FilterQuery<T>, projection?: ProjectionType<T | null>): Promise<Result<TEntity | null>> {
    const document = await this.DocumentModel.findOne(filterQuery, projection);
    if (!document) {
      return Result.fail('Error getting documents from database', HttpStatus.NOT_FOUND);
    }
    const entity = this.mapper.toDomain(document);
    return Result.ok(entity);
  }

  async findById(id: any, projection?: ProjectionType<T> | null): Promise<Result<TEntity | null>> {
    const document = await this.DocumentModel.findById(id, projection);
    if (!document) {
      return Result.fail('Error getting documents from database', HttpStatus.NOT_FOUND);
    }
    const entity = this.mapper.toDomain(document);
    return Result.ok(entity);
  }

  async find(
    query: FilterQuery<T>,
    select?: ProjectionType<T | null>,
    options?: QueryOptions<T>,
  ): Promise<Result<TEntity[] | []>> {
    const documents = await this.DocumentModel.find(query, select, options)
      .skip(options.skip)
      .limit(options.limit)
      .lean()
      .exec();
    const entities = documents?.length ? documents.map((document) => this.mapper.toDomain(document)) : [];
    return Result.ok(entities);
  }

  async pagination(query: FilterQuery<T>, select: ProjectionType<T | null>, options: QueryOptions<T>) {
    const pageSize = 500;
    const page = options.page || 1;
    const skip = (page - 1) * pageSize;
    const limit = options.limit || pageSize;
    const documents = this.DocumentModel.find(query, select, { ...options, skip, limit })
      .batchSize(pageSize)
      .cursor();
    return documents.map((doc) => this.mapper.toDomain(doc));
  }

  async create(document: any, options?: SaveOptions): Promise<Result<TEntity>> {
    const doc = this.createDocument(document);
    const result = (await (await doc.save(options)).toJSON()) as T;
    if (!result) {
      return Result.fail('An Error occured, unable to save document in the db', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const entity = this.mapper.toDomain(result);
    return Result.ok(entity);
  }

  async findOneAndUpdate(filterQuery: FilterQuery<T>, update: UpdateQuery<T>): Promise<Result<TEntity | null>> {
    const result = await this.DocumentModel.findByIdAndUpdate(filterQuery, update, {
      new: true,
    });
    if (!result) {
      return Result.fail('An Error occured, unable to update the database', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const entity = this.mapper.toDomain(result);
    return Result.ok(entity);
  }

  async upsert(filterQuery: FilterQuery<T>, document: Partial<T>): Promise<unknown> {
    const result = await this.DocumentModel.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });

    if (!result) {
      return Result.fail('Unable to update the database', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const entity = this.mapper.toDomain(result);
    return entity;
  }

  async deleteMany(filterQuery: FilterQuery<T>): Promise<boolean> {
    const result = this.DocumentModel.deleteMany(filterQuery);
    return (await result).deletedCount >= 1;
  }

  async deleteOne(filterQuery: FilterQuery<T>): Promise<boolean> {
    const result = this.DocumentModel.deleteOne(filterQuery);
    return (await result).deletedCount === 1;
  }

  async startSession(): Promise<ClientSession> {
    return await this.connection.startSession();
  }

  async insertMany(docs: any): Promise<Result<TEntity[]>> {
    try {
      const documentsToSave = docs.map((doc) => this.createDocument(doc));
      const documents = await this.DocumentModel.insertMany(documentsToSave);
      const entities: TEntity[] = documents.map((doc) => this.mapper.toDomain(doc));
      return Result.ok(entities);
    } catch (error) {
      throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, 'Unable to insert documents into the database');
    }
  }

  async updateOne(filter: any, query: any): Promise<Result<TEntity>> {
    const document = await this.DocumentModel.updateOne(filter, { $set: query });
    const entity: TEntity = this.mapper.toDomain(document as any);
    return Result.ok(entity);
  }

  createDocument(document: any) {
    return new this.DocumentModel({
      ...document,
      _id: GenericDocumentRepository.createObjectId(),
    });
  }
}
