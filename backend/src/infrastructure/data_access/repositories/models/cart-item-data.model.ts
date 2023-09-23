import { Types } from 'mongoose';
import { SelectedCartItemDataModel } from '../schemas/selected-cart-item.schema';

export interface ICartItemModel {
  readonly menuId: Types.ObjectId;
  readonly orderId: Types.ObjectId;
  readonly total: number;
  readonly selectedItems?: SelectedCartItemDataModel[];
}
