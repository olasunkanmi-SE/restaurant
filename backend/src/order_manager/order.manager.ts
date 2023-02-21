import { Types } from 'mongoose';
import { Audit, Entity, Result } from '../domain';
import { Merchant } from './../merchant/merchant';
import { IOrderManager } from './order.manager.entity';

export class OrderManager extends Entity<IOrderManager> implements IOrderManager {
  _firstName: string;
  _lastName: string;
  _email: string;
  _phoneNumber?: string;
  _merchant: Merchant;
  _role: number;
  _audit: Audit;
  _password: string;

  constructor(id: Types.ObjectId, props: IOrderManager) {
    super(id);
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._audit = props.audit;
    this._role = props.role;
    this._email = props.email;
    this._phoneNumber = props.phoneNumber;
    this._merchant = props.merchant;
    this._password = props.password;
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

  get merchant(): Merchant {
    return this._merchant;
  }

  set merchant(merchant: Merchant) {
    this._merchant = merchant;
  }

  get role(): number {
    return this._role;
  }

  set role(role: number) {
    this._role = role;
  }

  get audit(): Audit {
    return this._audit;
  }

  set audit(audit: Audit) {
    this._audit = audit;
  }

  get password(): string {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }

  static create(props: IOrderManager, id?: Types.ObjectId): Result<OrderManager> {
    return Result.ok(new OrderManager(id, props));
  }
}
