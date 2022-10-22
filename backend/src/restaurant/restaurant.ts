import { Types } from 'mongoose';
import { Entity } from '../domain/entity/';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result';
import { Location } from './../location/location';
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

  get webUrl(): string {
    return this._webUrl;
  }

  set webUrl(webUrl: string) {
    this._webUrl = webUrl;
  }

  get logoUrl(): string {
    return this._logoUrl;
  }

  set logoUrl(logoUrl: string) {
    this._logoUrl = logoUrl;
  }

  get timeZone(): string {
    return this._timeZone;
  }

  set timeZone(timeZone: string) {
    this._timeZone = timeZone;
  }

  get location(): Location {
    return this._location;
  }

  set location(location: Location) {
    this._location = location;
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
