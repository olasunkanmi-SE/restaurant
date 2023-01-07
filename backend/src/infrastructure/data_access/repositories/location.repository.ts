import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { GenericDocumentRepository } from '../../database/mongoDB/generic-document.repository';
import { TYPES } from './../../../application/constants/types';
import { IMapper } from './../../../domain/mapper/mapper';
import { Location } from './../../../location/location';
import { LocationData, LocationDocument } from './schemas';

@Injectable()
export class LocationRepository extends GenericDocumentRepository<Location, LocationDocument> {
  constructor(
    @InjectModel(LocationData.name)
    locationModel: Model<LocationDocument>,
    @InjectConnection() connection: Connection,
    @Inject(TYPES.IMapper) locationMapper: IMapper<Location, LocationDocument>,
  ) {
    super(locationModel, connection, locationMapper);
  }
}
