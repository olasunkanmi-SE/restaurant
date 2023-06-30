import { Entity, Result } from 'src/domain';
import { IOrder, currentStatus, dinningType } from './order-entity.interface';
import { Types } from 'mongoose';

export class Order extends Entity<IOrder> implements IOrder {
  _state: currentStatus;
  _type: dinningType;
  _merchantId: Types.ObjectId;
  _customerId?: Types.ObjectId;
  _total: number;
  _quantity: number;
  _discount?: number;
  _orderManagerId: Types.ObjectId;

  constructor(
    id: Types.ObjectId,
    { state, type, merchantId, customerId, total, quantity, discount, orderManagerId }: IOrder,
  ) {
    super(id);
    this._state = state;
    this._type = type;
    this._merchantId = merchantId;
    this._customerId = customerId;
    this._total = total;
    this._quantity = quantity;
    this._discount = discount;
    this._orderManagerId = orderManagerId;
  }

  get state(): currentStatus {
    return this._state;
  }

  set state(state: currentStatus) {
    this._state = state;
  }

  get type(): dinningType {
    return this._type;
  }

  set type(type: dinningType) {
    this._type = type;
  }

  get merchantId(): Types.ObjectId {
    return this._merchantId;
  }

  set merchantId(merchantId: Types.ObjectId) {
    this._merchantId = merchantId;
  }

  get customerId(): Types.ObjectId {
    return this._customerId;
  }

  set customerId(customerId: Types.ObjectId) {
    this._customerId = customerId;
  }

  get total(): number {
    return this._total;
  }

  set total(total: number) {
    this._total = total;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
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

  static create(props: IOrder, id?: Types.ObjectId) {
    return Result.ok(new Order(id, props));
  }
}
