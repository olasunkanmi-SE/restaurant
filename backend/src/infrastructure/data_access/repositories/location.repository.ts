import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { GenericDocumentRepository } from '../../database/mongoDB/generic-document.repository';
import { LocationDataModel, LocationDocument } from './schemas';

@Injectable()
export class LocationRepository extends GenericDocumentRepository<LocationDocument> {
  constructor(
    @InjectModel(LocationDataModel.name) locationModel: Model<LocationDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(locationModel, connection);
  }
}
