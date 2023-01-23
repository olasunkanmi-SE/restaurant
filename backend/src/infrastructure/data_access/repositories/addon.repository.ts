import { Result } from './../../../domain/result/result';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { Addon } from '../../../addon';
import { GenericDocumentRepository } from '../../../infrastructure/database';
import { AddonMapper } from './../../../addon/addon.mapper';
import { AddonDataModel, AddonDocument } from './../../../addon/addon.schema';
import { IaddonRepository } from './addon-repository.interface';

@Injectable()
export class AddonRepository extends GenericDocumentRepository<Addon, AddonDocument> implements IaddonRepository {
  constructor(
    @InjectModel(AddonDataModel.name) addonModel: Model<AddonDocument>,
    @InjectConnection() connection: Connection,
    addonMapper: AddonMapper,
  ) {
    super(addonModel, connection, addonMapper);
  }

  async getAddonsById(addonsIds: Types.ObjectId[]): Promise<Addon[]> {
    const result: Result<Addon[]> = await this.find({
      _id: { $in: addonsIds },
    });
    return result.getValue();
  }
}
