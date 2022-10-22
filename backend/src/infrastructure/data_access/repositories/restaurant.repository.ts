import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { GenericDocumentRepository } from '../../database/mongoDB/generic-document.repository';
import { RestaurantData, RestaurantDocument } from './schemas';

export class RestaurantRepository extends GenericDocumentRepository<RestaurantDocument> {
  constructor(
    @InjectModel(RestaurantData.name)
    restaurantModel: Model<RestaurantDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(restaurantModel, connection);
  }
}
