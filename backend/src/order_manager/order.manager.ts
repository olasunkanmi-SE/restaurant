import { Types } from 'mongoose';
import { Audit, Entity, Result } from '../domain';
import { IOrderManager, Role } from './order.manager.entity';

export class OrderManager extends Entity<IOrderManager> implements IOrderManager {
  _firstName: string;
  _lastName: string;
  _email: string;
  _phoneNumber?: string;
  _merchantId: Types.ObjectId;
  _role: Role;
  _audit: Audit;

  constructor(id: Types.ObjectId, props: IOrderManager) {
    super(id);
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._audit = props.audit;
    this._role = props.role;
    this._email = props.email;
    this._phoneNumber = props.phoneNumber;
    this._merchantId = props.merchantId;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(firstName: string) {
    this._firstName = firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(lastName: string) {
    this._lastName = lastName;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
  }

  get merchantId(): Types.ObjectId {
    return this._merchantId;
  }

  set merchantId(merchantId: Types.ObjectId) {
    this._merchantId = merchantId;
  }

  get role(): Role {
    return this._role;
  }

  set role(role: Role) {
    this._role = role;
  }

  get audit(): Audit {
    return this._audit;
  }

  set audit(audit: Audit) {
    this._audit = audit;
  }

  static create(props: IOrderManager, id?: Types.ObjectId): Result<OrderManager> {
    return Result.ok(new OrderManager(id, props));
  }
}
