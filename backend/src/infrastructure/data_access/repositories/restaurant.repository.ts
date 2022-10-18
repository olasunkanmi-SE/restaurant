import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { GenericDocumentRepository } from '../../database/mongoDB/generic-document.repository';
import { LocationDataDocument, RestaurantDocument } from './schemas';

export class RestaurantRepository extends GenericDocumentRepository<RestaurantDocument> {
  constructor(
    @InjectModel(LocationDataDocument.name)
    restaurantModel: Model<RestaurantDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(restaurantModel, connection);
  }
}
