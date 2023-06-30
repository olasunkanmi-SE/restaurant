import { Entity, Result } from 'src/domain';
import { ICartItem } from './cart-entity.interface';
import { Types } from 'mongoose';
import { ISelectedCartItem } from './cartItems/selected-cart-items-entity.interface';

export class CartItem extends Entity<ICartItem> implements ICartItem {
  _menuId: Types.ObjectId;
  _orderId: Types.ObjectId;
  _total: number;
  _selectedItems: ISelectedCartItem[];

  constructor(id: Types.ObjectId, props: ICartItem) {
    super(id);
    this._menuId = props.menuId;
    this._orderId = props.orderId;
    this._total = props.total;
    this._selectedItems = props.selectedItems;
  }

  get menuId(): Types.ObjectId {
    return this._menuId;
  }

  set menuId(menuId: Types.ObjectId) {
    this._menuId = menuId;
  }

  get orderId(): Types.ObjectId {
    return this._orderId;
  }

  set orderId(orderId: Types.ObjectId) {
    this._orderId = orderId;
  }

  get total(): number {
    return this._total;
  }

  set total(total: number) {
    this._total = total;
  }

  get selectedItems(): ISelectedCartItem[] {
    return this._selectedItems;
  }

  set setSelectedItems(selectedItems: ISelectedCartItem[]) {
    this._selectedItems = selectedItems;
  }

  static create(props: ICartItem, id?: Types.ObjectId) {
    return Result.ok(new CartItem(id, props));
  }
}
