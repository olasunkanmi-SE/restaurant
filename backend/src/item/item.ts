import { Types } from 'mongoose';
import { Audit, Entity, Result } from '../domain';
import { portion } from './../infrastructure/data_access/repositories/interfaces/item-model.interface';
import { IITem } from './item.entity.interface';

export class Item extends Entity<IITem> implements IITem {
  private _name: string;
  private _description: string;
  private _portion: portion;
  private _price: number;
  private _quantity: number;
  private _image: string;
  private _tags: string[];
  private _maximumPermitted: number;
  private _taxRate: number;
  private _audit: Audit;

  constructor(id: Types.ObjectId, props: IITem) {
    super(id);
    this._name = props.name;
    this._description = props.description;
    this._portion = props.portion;
    this._price = props.price;
    this._quantity = props.quantity;
    this._image = props.image;
    this._tags = props.tags;
    this._maximumPermitted = props.maximumPermitted;
    this._taxRate = props.taxRate;
    this._audit = props.audit;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  get portion(): portion {
    return this._portion;
  }

  set portion(portion: portion) {
    this._portion = portion;
  }

  get price(): number {
    return this._price;
  }

  set price(price: number) {
    this._price = price;
  }

  get quantity(): number | undefined {
    return this._quantity;
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
  }

  get image(): string {
    return this._image;
  }

  set image(image: string) {
    this._image = image;
  }

  get tags(): string[] {
    return this._tags;
  }

  set tags(tags: string[]) {
    this._tags = tags;
  }

  get maximumPermitted(): number | undefined {
    return this._maximumPermitted;
  }

  set maximumPermitted(maximumPermitted: number) {
    this._maximumPermitted = maximumPermitted;
  }

  get taxRate(): number {
    return this._taxRate;
  }

  set taxRate(taxRate: number) {
    this._taxRate = taxRate;
  }

  get audit(): Audit {
    return this._audit;
  }

  set audit(audit: Audit) {
    this._audit = audit;
  }

  static create(props: IITem, id?: Types.ObjectId): Result<Item> {
    return Result.ok(new Item(id, props));
  }
}
