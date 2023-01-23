import { Item } from './../../../item/item';
import { ItemDataModel } from './schemas/item.schema';
import { IGenericDocument } from './../../database/mongoDB/generic-document.interface';
import { Types } from 'mongoose';
export interface IItemRepository extends IGenericDocument<Item, ItemDataModel> {
  getItemwithAddons(id: Types.ObjectId): Promise<any>;
}
