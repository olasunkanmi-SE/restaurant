import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { GenericDocumentRepository } from '../../database/mongoDB/generic-document.repository';
import { Location, LocationDocument } from './schemas';

export class LocationRepository extends GenericDocumentRepository<LocationDocument> {
  constructor(
    @InjectModel(Location.name) locationModel: Model<LocationDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(locationModel, connection);
  }
}
