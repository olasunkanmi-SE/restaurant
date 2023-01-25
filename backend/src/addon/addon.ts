import { Types } from 'mongoose';
import { Entity } from '../domain';
import { Category } from './../category/category';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { IAddon } from './addon-entity.interface';

export class Addon extends Entity<IAddon> implements IAddon {
  private _name: string;
  private _description: string | undefined;
  private _audit: Audit;
  private _quantity: number;
  private _category: Category;
  constructor(id: Types.ObjectId, props: IAddon) {
    super(id);
    this._name = props.name;
    this._description = props.description;
    this._audit = props.audit;
    this._quantity = props.quantity;
    this._category = props.category;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get category(): Category {
    return this._category;
  }

  set category(category: Category) {
    this._category = category;
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
