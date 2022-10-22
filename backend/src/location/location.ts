import { Types } from 'mongoose';
import { Audit } from './../domain/audit/audit';
import { Entity } from './../domain/entity/entity';
import { Result } from './../domain/result/result';
import { ILocation } from './location.interface';

export class Location extends Entity<ILocation> {
  private _address: string;
  private _address2?: string;
  private _city: string;
  private _country: string;
  private _postCode: string;
  private _state: string;
  private _latitude?: string;
  private _longitude?: string;
  private _audit: Audit;
  constructor(id: Types.ObjectId, props: ILocation) {
    super(id);
    this._address = props.address;
    this._address2 = props.address2;
    this._city = props.city;
    this._country = props.country;
    this._state = props.state;
    this._latitude = props.latitude;
    this._longitude = props.longitude;
    this._audit = props.audit;
    this._postCode = props.postCode;
  }

  get address() {
    return this._address;
  }

  set address(address: string) {
    this._address = address;
  }

  get address2() {
    return this._address2;
  }

  set address2(address: string) {
    this._address2 = address;
  }

  get city() {
    return this._city;
  }

  set city(city: string) {
    this._city = city;
  }

  get country() {
    return this._country;
  }

  set country(country: string) {
    this._country = country;
  }

  get postCode() {
    return this._postCode;
  }

  set postCode(postCode: string) {
    this._postCode = postCode;
  }

  get state() {
    return this._state;
  }

  set state(state: string) {
    this._state = state;
  }

  get longitude(): string {
    return this._longitude;
  }

  set longitude(longitude: string) {
    this._longitude = longitude;
  }

  get latitude(): string {
    return this._latitude;
  }

  set latitude(latitude: string) {
    this._latitude = latitude;
  }

  get audit(): Audit {
    return this._audit;
  }

  set audit(audit) {
    this._audit = audit;
  }

  static create(props: ILocation, id?: Types.ObjectId): Result<Location> {
    return Result.ok(new Location(id, props));
  }
}
