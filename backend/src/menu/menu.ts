import { Types } from 'mongoose';
import { Entity } from '../domain';
import { Addon } from './../addon/addon';
import { Category } from './../category/category';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { Item } from './../item/item';
import { IMenu } from './menu-entity.interface';

export class Menu extends Entity<IMenu> implements IMenu {
  _name: string;
  _description: string;
  _items: Item[];
  _addons: Addon[];
  _audit: Audit;
  _discount: number;
  _imageUrl: string;
  _basePrice: number;
  _category: Category;
  constructor(id: Types.ObjectId, props: IMenu) {
    super(id);
    this._name = props.name;
    this._description = props.description;
    this._items = props.items;
    this._audit = props.audit;
    this._discount = props.discount;
    this._imageUrl = props.imageUrl;
    this._basePrice = props.basePrice;
    this._category = props.category;
    this._addons = props.addons;
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

  get addons(): Addon[] | undefined {
    return this._addons;
  }

  set addons(value: Addon[]) {
    this._addons = value;
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

  get basePrice(): number {
    return this._basePrice;
  }

  set basePrice(value: number) {
    this._basePrice = value;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  set imageUrl(imageUrl: string) {
    this._imageUrl = imageUrl;
  }

  get category(): Category {
    return this._category;
  }

  set category(category: Category) {
    this._category = category;
  }

  static create(props: IMenu, id?: Types.ObjectId): Result<Menu> {
    return Result.ok(new Menu(id, props));
  }
}
