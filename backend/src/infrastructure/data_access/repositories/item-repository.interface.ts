import { Result } from './../../../domain/result/result';
import { Item } from './../../../item/item';
import { ItemDataModel, ItemDocument } from './schemas/item.schema';
import { IGenericDocument } from './../../database/mongoDB/generic-document.interface';
import { Types } from 'mongoose';
export interface IItemRepository extends IGenericDocument<Item, ItemDataModel> {
  getItemwithAddons(id: Types.ObjectId): Promise<any>;
  getItem(name: string): Promise<Result<Item>>;
  createItem(itemModel: ItemDataModel): Promise<Result<ItemDocument>>;
  getItems(name: string): Promise<Result<Item[]>>;
}
