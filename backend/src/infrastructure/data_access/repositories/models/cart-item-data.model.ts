import { Types } from 'mongoose';
import { ISelectedCartItem } from 'src/cart/cartItems/selected-cart-items-entity.interface';
import { SelectedCartItemDataModel } from '../schemas/selected-cart-item.schema';

export interface ICartItemModel {
  readonly menuId: Types.ObjectId;
  readonly orderId: Types.ObjectId;
  readonly total: number;
  readonly selectedItems: SelectedCartItemDataModel[];
}
