import { Types } from 'mongoose';
import { Entity } from '../domain/entity/';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result';
import { Location } from './../location/location';
import { Merchant } from './../merchant/merchant';
import { IRestaurant } from './restaurant.interface';

export class Restaurant extends Entity<IRestaurant> {
  private _name: string;
  private _email: string;
  private _isActive: boolean;
  private _webUrl?: string;
  private _logoUrl?: string;
  private _timeZone?: string;
  private _location: Location;
  private _audit: Audit;
  private _phoneNumber: string;
  private _merchant: Merchant;
  constructor(id: Types.ObjectId, props: IRestaurant) {
    super(id);
    this._name = props.name;
    this._email = props.email;
    this._isActive = props.isActive;
    this._webUrl = props.webUrl;
    this._logoUrl = props.logoUrl;
    this._timeZone = props.timeZone;
    this._location = props.location;
    this._audit = props.audit;
    this._phoneNumber = props.phoneNumber;
    this._merchant = props.merchant;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(isActive: boolean) {
    this._isActive = isActive;
  }

  get webUrl(): string | undefined {
    return this._webUrl;
  }

  set webUrl(webUrl: string | undefined) {
    this._webUrl = webUrl;
  }

  get logoUrl(): string | undefined {
    return this._logoUrl;
  }

  set logoUrl(logoUrl: string | undefined) {
    this._logoUrl = logoUrl;
  }

  get timeZone(): string | undefined {
    return this._timeZone;
  }

  set timeZone(timeZone: string | undefined) {
    this._timeZone = timeZone;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
  }

  get location(): Location {
    return this._location;
  }

  set location(location: Location) {
    this._location = location;
  }

  get merchant(): Merchant {
    return this._merchant;
  }

  set merchant(merchant: Merchant) {
    this._merchant = merchant;
  }

  get audit(): Audit {
    return this._audit;
  }

  set audit(audit) {
    this._audit = audit;
  }

  static create(props: IRestaurant, id?: Types.ObjectId): Result<Restaurant> {
    return Result.ok(new Restaurant(id, props));
  }
}
