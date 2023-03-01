import { FilterQuery, Types } from 'mongoose';
import { Addon } from '../../../../addon/addon';
import { AddonDataModel } from '../../../../addon/addon.schema';
import { IGenericDocument } from '../../../database/mongoDB/generic-document.interface';
import { Result } from './../../../../domain/result/result';
export interface IAddonRepository extends IGenericDocument<Addon, AddonDataModel> {
  getAddonsById(addonsIds: Types.ObjectId[]): Promise<Addon[]>;
  getAddonWithCategory(id: Types.ObjectId): Promise<any>;
  getAddons(): Promise<any>;
  getAddonsByIds(filterQuery: FilterQuery<Addon>): Promise<Result<Addon[]>>;
}
