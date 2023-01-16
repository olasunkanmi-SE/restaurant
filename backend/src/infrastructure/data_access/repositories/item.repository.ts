import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { GenericDocumentRepository } from 'src/infrastructure/database';
import { ItemMapper } from '../../../item/item.mapper';
import { Item } from './../../../item/item';
import { ItemDataModel, ItemDocument } from './schemas/item.schema';

@Injectable()
export class ITemRepository extends GenericDocumentRepository<Item, ItemDocument> {
  constructor(
    @InjectModel(ItemDataModel.name) itemModel: Model<ItemDocument>,
    @InjectConnection() connection: Connection,
    itemMapper: ItemMapper,
  ) {
    super(itemModel, connection, itemMapper);
  }
}
