import { Types } from 'mongoose';
import { Audit } from 'src/domain';
import { SelectedCartItem } from './selectedItems/selectedCartItem';

export interface ICartItem {
  menuId: Types.ObjectId;
  orderId: Types.ObjectId;
  total: number;
  selectedItems: SelectedCartItem[];
  audit: Audit;
}
