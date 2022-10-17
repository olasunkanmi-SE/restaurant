import { Types } from 'mongoose';
import { ILocation } from './location.interface';
import { Audit } from './../domain/audit/audit';
import { Entity } from './../domain/entity/entity';
import { Result } from './../domain/result/result';

export class Location extends Entity {
  private _address: string;
  private _address2: string;
  private _city: string;
  private _country: string;
  private _postalCode: string;
  private _state: string;
  private _latitude?: number;
  private _longitude?: number;
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

  get postalCode() {
    return this._postalCode;
  }

  set postalCode(postalCode: string) {
    this._postalCode = postalCode;
  }

  get state() {
    return this._state;
  }

  set state(state: string) {
    this._state = state;
  }

  get longitude() {
    return this._longitude;
  }

  set longitude(longitude: number) {
    this._longitude = longitude;
  }

  get latitude(): number {
    return this._latitude;
  }

  set latitude(latitude: number) {
    this._latitude = latitude;
  }

  get audit(): Audit {
    return this._audit;
  }

  static create(props: ILocation, id?: Types.ObjectId) {
    return Result.ok(new Location(id, props));
  }
}
