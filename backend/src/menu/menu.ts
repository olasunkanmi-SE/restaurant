import { Audit } from './../domain/audit/audit';
import { Types } from 'mongoose';
import { Entity } from '../domain';
import { Result } from './../domain/result/result';
import { Item } from './../item/item';
import { IMenu } from './menu-entity.interface';

export class Menu extends Entity<IMenu> implements IMenu {
  _name: string;
  _description: string;
  _items: Item[];
  _audit: Audit;
  _discount: number;
  constructor(id: Types.ObjectId, props: IMenu) {
    super(id);
    this._name = props.name;
    this._description = props.description;
    this._items = props.items;
    this._audit = props.audit;
    this._discount = props.discount;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string | undefined {
    return this._description;
  }

  set description(value: string | undefined) {
    this._description = value;
  }

  get items(): Item[] | undefined {
    return this._items;
  }

  set items(value: Item[] | undefined) {
    this._items = value;
  }

  get audit(): Audit {
    return this._audit;
  }
  
  get discount(): number {
    return this._discount;
  }

  set discount(value: number) {
    this._discount = value;
  }

  get discount(): number {
    return this._discount;
  }

  set discount(value: number) {
    this._discount = value;
  }

  static create(props: IMenu, id?: Types.ObjectId): Result<Menu> {
    return Result.ok(new Menu(id, props));
  }
}
