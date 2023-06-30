import { ISelectedCartItem } from './cartItems/selected-cart-items-entity.interface';

export interface ICartItem {
  id: Types.ObjectId;
  menuId: Types.ObjectId;
  orderId: Types.ObjectId;
  total: number;
  SelectedItem: ISelectedCartItem[];
}
