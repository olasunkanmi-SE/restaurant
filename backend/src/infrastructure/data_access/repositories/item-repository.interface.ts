import { FilterQuery, Types } from 'mongoose';
import { Result } from './../../../domain/result/result';
import { Item } from './../../../item/item';
import { IGenericDocument } from './../../database/mongoDB/generic-document.interface';
import { ItemDataModel, ItemDocument } from './schemas/item.schema';
export interface IItemRepository extends IGenericDocument<Item, ItemDataModel> {
  getItemwithAddons(id: Types.ObjectId): Promise<any>;
  getItem(name: string): Promise<Result<Item>>;
  createItem(itemModel: ItemDataModel): Promise<Result<ItemDocument>>;
  getItems(filterQuery: FilterQuery<Item>): Promise<Result<Item[]>>;
}
