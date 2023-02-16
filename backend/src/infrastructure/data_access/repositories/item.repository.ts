import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, FilterQuery, Model, Types } from 'mongoose';
import { GenericDocumentRepository } from '../../../infrastructure/database';
import { ItemMapper } from '../../../item/item.mapper';
import { Result } from './../../../domain/result/result';
import { Item } from './../../../item/item';
import { IItemRepository } from '../repositories/interfaces';
import { ItemDataModel, ItemDocument } from './schemas/item.schema';

@Injectable()
export class ITemRepository extends GenericDocumentRepository<Item, ItemDocument> implements IItemRepository {
  itemMapper: ItemMapper;
  constructor(
    @InjectModel(ItemDataModel.name) itemModel: Model<ItemDocument>,
    @InjectConnection() connection: Connection,
    itemMapper: ItemMapper,
  ) {
    super(itemModel, connection, itemMapper);
    this.itemMapper = itemMapper;
  }

  async getItemwithAddons(id: Types.ObjectId): Promise<any> {
    const itemDoc = await this.DocumentModel.findById(id).populate('addons').exec();
    if (!itemDoc) {
      return Result.fail('Error getting document from database', HttpStatus.NOT_FOUND);
    }
    return itemDoc;
  }

  async createItem(itemModel: ItemDataModel): Promise<Result<any>> {
    const doc = new this.DocumentModel({
      ...itemModel,
      _id: new Types.ObjectId(),
    });
    const result = (await doc.save()).toJSON();
    if (!result) {
      return Result.fail('An Error occured, unable to save document in the db', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return Result.ok(result);
  }

  async getItem(name: string): Promise<Result<Item>> {
    const itemDoc = await this.DocumentModel.findOne({ name }).populate('addons').exec();
    if (!itemDoc) {
      return Result.fail('Error getting document from database', HttpStatus.NOT_FOUND);
    }
    const item: Item = this.itemMapper.toDomain(itemDoc);
    return Result.ok(item);
  }

  async getItems(filterQuery: FilterQuery<Item>): Promise<Result<Item[]>> {
    const itemDocs = await this.DocumentModel.find(filterQuery).populate('addons').exec();
    if (!itemDocs) {
      return Result.fail('Error getting document from database', HttpStatus.NOT_FOUND);
    }
    const items: Item[] =
      itemDocs && itemDocs.length ? itemDocs.map((document) => this.itemMapper.toDomain(document)) : [];
    return Result.ok(items);
  }
}
