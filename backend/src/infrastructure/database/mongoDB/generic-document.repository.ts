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

export abstract class GenericDocumentRepository<T extends Document>
  implements IGenericDocument<T>
{
  constructor(
    protected readonly DocumentModel: Model<T>,
    private readonly connection: Connection,
  ) {}

  async findOne(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T | null>,
  ): Promise<T | null> {
    return this.DocumentModel.findOne(filterQuery, projection).exec();
  }

  async find(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T | null>,
    options?: QueryOptions<T>,
  ): Promise<T[] | null> {
    return this.DocumentModel.find(filterQuery, projection, options).exec();
  }

  async create(document: any, options?: SaveOptions): Promise<T> {
    const doc = new this.DocumentModel({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await (await doc.save(options)).toJSON()) as T;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<T | null> {
    return this.DocumentModel.findByIdAndUpdate(filterQuery, update, {
      new: true,
    });
  }

  async upsert(
    filterQuery: FilterQuery<T>,
    document: Partial<T>,
  ): Promise<T | null> {
    return this.DocumentModel.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
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
