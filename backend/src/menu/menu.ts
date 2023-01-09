import { Result } from './../domain/result/result';
import { IITem } from './../item/item.entity.interface';
import { Entity } from 'src/domain';
import { IMenu } from './menu-entity.interface';
import { Types } from 'mongoose';

export class Menu extends Entity<IMenu> implements IMenu {
  _name: string;
  _description: string;
  _items: IITem[];
  constructor(id: Types.ObjectId, props: IMenu) {
    super(id);
    this._name = props.name;
    this._description = props.description;
    this._items = props.items;
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

  get items(): IITem[] | undefined {
    return this._items;
  }

  set items(value: IITem[] | undefined) {
    this._items = value;
  }

  static create(props: IMenu, id: Types.ObjectId): Result<Menu> {
    return Result.ok(new Menu(id, props));
  }
}
