import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { GenericDocumentRepository } from '../../database/mongoDB/generic-document.repository';
import { LocationDataModel, RestaurantDocument } from './schemas';

export class RestaurantRepository extends GenericDocumentRepository<RestaurantDocument> {
  constructor(
    @InjectModel(LocationDataModel.name)
    restaurantModel: Model<RestaurantDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(restaurantModel, connection);
  }
}
