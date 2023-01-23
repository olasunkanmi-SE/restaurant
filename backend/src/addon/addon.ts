import { Result } from './../domain/result/result';
import { Audit } from './../domain/audit/audit';
import { Entity } from '../domain';
import { IAddon } from './addon-entity.interface';
import { Types } from 'mongoose';

export class Addon extends Entity<IAddon> implements IAddon {
  private _name: string;
  private _code: string;
  private _description: string | undefined;
  private _audit: Audit;
  private _quantity: number;
  constructor(id: Types.ObjectId, props: IAddon) {
    super(id);
    this._name = props.name;
    this._description = props.description;
    this._code = props.code;
    this._audit = props.audit;
    this._quantity = props.quantity;
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

  get audit(): Audit {
    return this._audit;
  }

  set audit(audit: Audit) {
    this._audit = audit;
  }

  get description(): string | undefined {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
  }

  static create(props: IAddon, id?: Types.ObjectId): Addon {
    return Result.ok(new Addon(id, props)).getValue();
  }
}
