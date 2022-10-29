import { Types } from 'mongoose';
import { Audit, Entity, Result } from './../domain';
import { IMerchant } from './merchant.interface';

export class Merchant extends Entity<IMerchant> {
  private _firstName?: string;
  private _lastName?: string;
  private _email: string;
  private _organisationName?: string;
  private _phoneNumber?: string;
  private _passwordHash: string;
  private _role?: string;
  private _isActive?: boolean;
  private _status?: string;
  private _organisationAddress?: string;
  private _refreshTokenHash?: string;
  private _audit: Audit;

  constructor(id: Types.ObjectId, props: IMerchant) {
    super(id);
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._email = props.email;
    this._organisationName = props.organisationName;
    this._phoneNumber = props.phoneNumber;
    this._passwordHash = props.passwordHash;
    this._role = props.role;
    this._isActive = props.isActive;
    this._status = props.status;
    this._organisationAddress = props.organisationAddress;
    this._refreshTokenHash = props.refreshTokenHash;
    this._audit = props.audit;
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

  get organisationName(): string {
    return this._organisationName;
  }

  set organisationName(organisationName: string) {
    this._organisationName = organisationName;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  set passwordHash(passwordHash: string) {
    this._passwordHash = passwordHash;
  }

  get role(): string {
    return this._role;
  }

  set role(role: string) {
    this._role = role;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(isActive: boolean) {
    this._isActive = isActive;
  }

  get status(): string {
    return this._status;
  }

  set status(status: string) {
    this._status = status;
  }

  get organisationAddress(): string {
    return this._organisationAddress;
  }

  set organisationAddress(organisationAddress: string) {
    this._organisationAddress = organisationAddress;
  }

  get audit(): Audit {
    return this._audit;
  }

  set audit(audit) {
    this._audit = audit;
  }
  get refreshTokenHash(): string {
    return this._refreshTokenHash;
  }

  set refreshTokenHash(token: string) {
    this._refreshTokenHash = token;
  }

  static create(props: IMerchant, id?: Types.ObjectId): Result<Merchant> {
    return Result.ok(new Merchant(id, props));
  }

  update(props: Partial<IMerchant>) {
    if (Object.hasOwnProperty.call(props, 'refreshTokenHash')) {
      this._refreshTokenHash = props.refreshTokenHash;
    }
  }
}
