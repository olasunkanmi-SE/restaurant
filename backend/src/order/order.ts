import { Types } from 'mongoose';
import { CartItem } from '../cart/cart-item';
import { Entity, Result } from '../domain';
import { OrderStatus } from '../order_statuses/order_status';
import { Audit } from './../domain/audit/audit';
import { IOrder, dinningType } from './order-entity.interface';

export class Order extends Entity<IOrder> implements IOrder {
  _state: OrderStatus | undefined;
  _type: dinningType;
  _singleclientId: Types.ObjectId;
  _orderStatusId: Types.ObjectId;
  _customerId?: Types.ObjectId;
  _total: number;
  _discount?: number;
  _orderManagerId: Types.ObjectId;
  _audit: Audit;
  _cartItems: CartItem[] | undefined;
  _summary: string;

  constructor(
    id: Types.ObjectId,
    {
      state,
      type,
      singleclientId,
      customerId,
      total,
      discount,
      orderManagerId,
      audit,
      cartItems,
      orderStatusId,
      summary,
    }: IOrder,
  ) {
    super(id);
    this._state = state;
    this._type = type;
    this._singleclientId = singleclientId;
    this._customerId = customerId;
    this._total = total;
    this._discount = discount;
    this._orderManagerId = orderManagerId;
    this._audit = audit;
    this._cartItems = cartItems;
    this._orderStatusId = orderStatusId;
    this._summary = summary;
  }

  get state(): OrderStatus {
    return this._state;
  }

  set state(state: OrderStatus) {
    this._state = state;
  }

  get summary(): string {
    return this._summary;
  }

  get type(): dinningType {
    return this._type;
  }

  set type(type: dinningType) {
    this._type = type;
  }

  get singleclientId(): Types.ObjectId {
    return this._singleclientId;
  }

  set singleclientId(singleclientId: Types.ObjectId) {
    this._singleclientId = singleclientId;
  }

  get customerId(): Types.ObjectId {
    return this._customerId;
  }

  set customerId(customerId: Types.ObjectId) {
    this._customerId = customerId;
  }

  get orderStatusId(): Types.ObjectId {
    return this._orderStatusId;
  }

  set orderStatusId(orderStatusId: Types.ObjectId) {
    this._orderStatusId = orderStatusId;
  }

  get total(): number {
    return this._total;
  }

  set total(total: number) {
    this._total = total;
  }

  get discount(): number {
    return this._discount;
  }

  set discount(discount: number) {
    this._discount = discount;
  }

  get orderManagerId(): Types.ObjectId {
    return this._orderManagerId;
  }

  set orderManagerId(managerId: Types.ObjectId) {
    this._orderManagerId = managerId;
  }

  get audit(): Audit {
    return this._audit;
  }

  set audit(audit: Audit) {
    this._audit = audit;
  }

  get cartItems(): CartItem[] | undefined {
    return this._cartItems;
  }

  set cartItems(cartItems: CartItem[] | undefined) {
    this._cartItems = cartItems;
  }

  static create(props: IOrder, id?: Types.ObjectId) {
    return Result.ok(new Order(id, props)).getValue();
  }
}
