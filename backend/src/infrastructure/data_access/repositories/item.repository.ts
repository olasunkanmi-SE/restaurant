import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { GenericDocumentRepository } from '../../../infrastructure/database';
import { ItemMapper } from '../../../item/item.mapper';
import { Item } from './../../../item/item';
import { ItemDataModel, ItemDocument } from './schemas/item.schema';
import { IItemRepository } from './item-repository.interface';

@Injectable()
export class ITemRepository extends GenericDocumentRepository<Item, ItemDocument> implements IItemRepository {
  constructor(
    @InjectModel(ItemDataModel.name) itemModel: Model<ItemDocument>,
    @InjectConnection() connection: Connection,
    itemMapper: ItemMapper,
  ) {
    super(itemModel, connection, itemMapper);
  }

  async getItemwithAddons(id: Types.ObjectId): Promise<any> {
    return await this.DocumentModel.findById(id).populate('addons').exec();
  }
}
