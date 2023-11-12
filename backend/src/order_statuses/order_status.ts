import { Entity, Result } from 'src/domain';
import { IOrderStatuses } from './order_status_entity.interface';
import { Types } from 'mongoose';

export class OrderStatus extends Entity<IOrderStatuses> implements IOrderStatuses {
  _isActive: boolean;
  _name: string;
  _code: string;
  _description?: string;
  constructor(id: Types.ObjectId, props: IOrderStatuses) {
    super(id);
    this._isActive = props.isActive;
    this._name = props.name;
    this._code = props.code;
    this._description = props.description;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(isActive: boolean) {
    this._isActive = isActive;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get code(): string {
    return this._code;
  }

  set code(code: string) {
    this._code = code;
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  static create(props: IOrderStatuses, id?: Types.ObjectId) {
    return Result.ok(new OrderStatus(id, props)).getValue();
  }
}
