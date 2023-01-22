import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Addon } from '../../../addon';
import { GenericDocumentRepository } from '../../../infrastructure/database';
import { AddonMapper } from './../../../addon/addon.mapper';
import { AddonDataModel, AddonDocument } from './../../../addon/addon.schema';

@Injectable()
export class AddonRepository extends GenericDocumentRepository<Addon, AddonDocument> {
  constructor(
    @InjectModel(AddonDataModel.name) addonModel: Model<AddonDocument>,
    @InjectConnection() connection: Connection,
    addonMapper: AddonMapper,
  ) {
    super(addonModel, connection, addonMapper);
  }
}
