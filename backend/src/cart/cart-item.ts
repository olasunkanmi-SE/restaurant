import { Types } from 'mongoose';
import { Audit, Entity, Result } from '../domain';
import { ICartItem } from './cart-entity.interface';
import { SelectedCartItem } from './selectedItems/selectedCartItem';

export class CartItem extends Entity<ICartItem> implements ICartItem {
  _menuId: Types.ObjectId;
  _orderId: Types.ObjectId;
  _total: number;
  _selectedItems: SelectedCartItem[] | undefined;
  _audit: Audit;

  constructor(id: Types.ObjectId, props: ICartItem) {
    super(id);
    this._menuId = props.menuId;
    this._orderId = props.orderId;
    this._total = props.total;
    this._selectedItems = props.selectedItems;
    this._audit = props.audit;
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

  get selectedItems(): SelectedCartItem[] | undefined {
    return this._selectedItems;
  }

  set selectedItems(selectedItems: SelectedCartItem[] | undefined) {
    this._selectedItems = selectedItems;
  }

  get audit(): Audit {
    return this._audit;
  }

  set audit(audit: Audit) {
    this._audit = audit;
  }

  static create(props: ICartItem, id?: Types.ObjectId) {
    return Result.ok(new CartItem(id, props)).getValue();
  }
}
