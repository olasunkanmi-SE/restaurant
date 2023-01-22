import { Result } from './../domain/result/result';
import { Audit } from './../domain/audit/audit';
import { Entity } from 'src/domain';
import { IAddon } from './addon-entity.interface';
import { Types } from 'mongoose';

export class Addon extends Entity<IAddon> implements IAddon {
  private _category: string;
  private _code: string;
  private _description: string | undefined;
  private _audit: Audit;
  constructor(id: Types.ObjectId, props: IAddon) {
    super(id);
    this._category = props.category;
    this._description = props.description;
    this._code = props.code;
    this._audit = props.audit;
  }

  get category(): string {
    return this._category;
  }

  set category(category: string) {
    this._category = category;
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

  static create(props: IAddon, id?: Types.ObjectId): Addon {
    return Result.ok(new Addon(id, props)).getValue();
  }
}
