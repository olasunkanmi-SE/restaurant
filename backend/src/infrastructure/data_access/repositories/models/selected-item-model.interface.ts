import { Types } from 'mongoose';

export interface ISelectedCartItemDataModel {
  readonly cartItemId: Types.ObjectId;
  readonly price: number;
  readonly quantity: number;
}
