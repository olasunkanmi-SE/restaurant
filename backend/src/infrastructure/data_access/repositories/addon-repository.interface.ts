import { Types } from 'mongoose';
import { Addon } from './../../../addon/addon';
import { AddonDataModel } from './../../../addon/addon.schema';
import { IGenericDocument } from './../../database/mongoDB/generic-document.interface';
export interface IaddonRepository extends IGenericDocument<Addon, AddonDataModel> {
  getAddonsById(addonsIds: Types.ObjectId[]): Promise<Addon[]>;
}
