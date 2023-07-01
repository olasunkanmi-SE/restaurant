import { Audit, Entity, Result } from 'src/domain';
import { ISelectedCartItem } from './selected-cart-items-entity.interface';
import { Types } from 'mongoose';

export class SelectedCartItem extends Entity<ISelectedCartItem> implements ISelectedCartItem {
  _menuId: Types.ObjectId;
  _itemId: Types.ObjectId;
  _price: number;
  _quantity: number;
  _audit: Audit;

  constructor(id: Types.ObjectId, props: ISelectedCartItem) {
    super(id);
    this._menuId = props.menuId;
    this._price = props.price;
    this._quantity = props.quantity;
    this._itemId = props.itemId;
    this._audit = props.audit;
  }

  get menuId(): Types.ObjectId {
    return this._menuId;
  }

  set menuId(id: Types.ObjectId) {
    this._menuId = id;
  }

  get itemId(): Types.ObjectId {
    return this._itemId;
  }

  set itemId(id: Types.ObjectId) {
    this._itemId = id;
  }

  get price(): number {
    return this._price;
  }

  set price(price: number) {
    this._price = price;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
  }

  get audit(): Audit {
    return this._audit;
  }

  set audit(audit: Audit) {
    this._audit = audit;
  }

  static create(props: ISelectedCartItem, id?: Types.ObjectId) {
    return Result.ok(new SelectedCartItem(id, props));
  }
}
