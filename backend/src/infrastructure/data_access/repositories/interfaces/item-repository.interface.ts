import { Result } from './../../../../domain/result/result';
import { ItemDataModel } from '../schemas';
import { Item } from './../../../../item/item';
import { IGenericDocument } from './../../../database/mongoDB/generic-document.interface';
import { FilterQuery, Types } from 'mongoose';
export interface IItemRepository extends IGenericDocument<Item, ItemDataModel> {
  getItemById(id: Types.ObjectId): Promise<Result<Item>>;
  getItem(name: string): Promise<Result<Item>>;
  createItem(itemModel: ItemDataModel): Promise<Result<Item>>;
  getItems(filterQuery: FilterQuery<Item>): Promise<Result<Item[]>>;
}
