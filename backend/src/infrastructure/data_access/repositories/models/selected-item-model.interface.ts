import { Types } from 'mongoose';

export interface ISelectedCartItemDataModel {
  readonly menuId: Types.ObjectId;
  readonly itemId: Types.ObjectId;
  readonly price: number;
  readonly quantity: number;
}
