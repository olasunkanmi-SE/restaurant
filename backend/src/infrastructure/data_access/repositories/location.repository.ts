import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { GenericDocumentRepository } from '../../database/mongoDB/generic-document.repository';
import { LocationData, LocationDocument } from './schemas';

@Injectable()
export class LocationRepository extends GenericDocumentRepository<LocationDocument> {
  constructor(
    @InjectModel(LocationData.name)
    locationModel: Model<LocationDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(locationModel, connection);
  }
}
