import { Audit, Entity, Result } from '../domain';
import { IOrderStatuses } from './order_status_entity.interface';
import { Types } from 'mongoose';

export class OrderStatus extends Entity<IOrderStatuses> implements IOrderStatuses {
  _isActive: boolean;
  _name: string;
  _code: string;
  _description?: string;
  _audit: Audit;
  constructor(id: Types.ObjectId, props: IOrderStatuses) {
    super(id);
    this._isActive = props.isActive;
    this._name = props.name;
    this._code = props.code;
    this._description = props.description;
    this._audit = props.audit;
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

  get audit(): Audit {
    return this._audit;
  }

  set audit(audit: Audit) {
    this._audit = audit;
  }

  static create(props: IOrderStatuses, id?: Types.ObjectId): OrderStatus {
    return Result.ok(new OrderStatus(id, props)).getValue();
  }
}
