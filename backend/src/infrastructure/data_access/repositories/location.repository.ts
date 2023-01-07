import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { GenericDocumentRepository } from '../../database/mongoDB/generic-document.repository';
import { Location } from './../../../location/location';
import { LocationMapper } from './../../../location/location.mapper';
import { LocationData, LocationDocument } from './schemas';

@Injectable()
export class LocationRepository extends GenericDocumentRepository<Location, LocationDocument> {
  constructor(
    @InjectModel(LocationData.name)
    locationModel: Model<LocationDocument>,
    @InjectConnection() connection: Connection,
    locationMapper: LocationMapper,
  ) {
    super(locationModel, connection, locationMapper);
  }
}
