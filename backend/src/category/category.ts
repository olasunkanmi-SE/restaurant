import { Result } from './../domain/result/result';
import { Types } from 'mongoose';
import { Entity } from '../domain';
import { Audit } from './../domain/audit/audit';
import { ICategory } from './category-entity.interface';

export class Category extends Entity<ICategory> {
  private _name: string;
  private _code: string;
  private _description?: string;
  private _audit: Audit;
  constructor(id: Types.ObjectId, props: ICategory) {
    super(id);
    this._name = props.name;
    this._code = props.code;
    this._description = props.description;
    this._audit = props.audit;
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

  get description(): string | undefined {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  get audit(): Audit {
    return this._audit;
  }

  set audit(audit: Audit) {
    this._audit = audit;
  }

  static create(props: ICategory, id?: Types.ObjectId): Result<Category> {
    return Result.ok(new Category(id, props));
  }
}
