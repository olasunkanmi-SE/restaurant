import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, FilterQuery, Model, Types } from 'mongoose';
import { Addon } from '../../../addon';
import { GenericDocumentRepository } from '../../../infrastructure/database';
import { AddonMapper } from './../../../addon/addon.mapper';
import { AddonDataModel, AddonDocument } from './../../../addon/addon.schema';
import { Result } from './../../../domain/result';
import { IAddonRepository } from './interfaces/addon-repository.interface';

@Injectable()
export class AddonRepository extends GenericDocumentRepository<Addon, AddonDocument> implements IAddonRepository {
  addonMapper: AddonMapper;
  constructor(
    @InjectModel(AddonDataModel.name) addonModel: Model<AddonDocument>,
    @InjectConnection() connection: Connection,
    addonMapper: AddonMapper,
  ) {
    super(addonModel, connection, addonMapper);
    this.addonMapper = addonMapper;
  }

  async getAddonsByIds(addonsIds: Types.ObjectId[]): Promise<Addon[] | []> {
    const addonDocs = await this.DocumentModel.find({
      _id: { $in: addonsIds },
    })
      .populate('category')
      .exec();
    let addons: Addon[] = [];
    if (addonDocs && addonDocs.length) {
      addons = addonDocs.map((doc) => this.addonMapper.toDomain(doc));
    }
    return addons;
  }

  async getAddonWithCategory(id: Types.ObjectId): Promise<any> {
    return await this.DocumentModel.findById(id).populate('category').exec();
  }

  async getAddons(): Promise<any> {
    return await this.DocumentModel.find({}).populate('category').exec();
  }

  // async getAddonsByIds(filterQuery: FilterQuery<Addon>): Promise<Result<Addon[]>> {
  //   const addonDocs = await this.DocumentModel.find(filterQuery);
  //   return Result.ok(addonDocs.map((doc) => this.addonMapper.toDomain(doc)));
  // }
}
