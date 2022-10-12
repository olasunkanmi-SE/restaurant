import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { GenericDocumentRepository } from '../../database/mongoDB/generic-document.repository';
import { Location, RestaurantDocument } from './schemas';

export class RestaurantRepository extends GenericDocumentRepository<RestaurantDocument> {
  constructor(
    @InjectModel(Location.name) restaurantModel: Model<RestaurantDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(restaurantModel, connection);
  }
}
