import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { GenericDocumentRepository } from '../../database/mongoDB/generic-document.repository';
import { Result } from './../../../domain/result/result';
import { SingleClient } from './../../../singleclient/singleclient';
import { Restaurant } from './../../../restaurant/restaurant';
import { RestaurantMapper } from './../../../restaurant/restaurant.mapper';
import { SingleClientRepository } from './singleclient.repository';
import { IRestaurantRepository } from './interfaces/restaurant-repository.interface';
import { RestaurantData, RestaurantDocument } from './schemas';
import { throwApplicationError } from '../../../infrastructure/utilities/exception-instance';
import { HttpStatus } from '@nestjs/common';

export class RestaurantRepository
  extends GenericDocumentRepository<Restaurant, RestaurantDocument>
  implements IRestaurantRepository
{
  restaurantMapper: RestaurantMapper;
  constructor(
    @InjectModel(RestaurantData.name)
    restaurantModel: Model<RestaurantDocument>,
    @InjectConnection() connection: Connection,
    private readonly singleclientRepository: SingleClientRepository,
    restaurantMapper: RestaurantMapper,
  ) {
    super(restaurantModel, connection, restaurantMapper);
    this.restaurantMapper = restaurantMapper;
  }

  async getRestaurant(restaurantId: Types.ObjectId): Promise<Restaurant> {
    const restaurantDoc = await this.DocumentModel.findById(restaurantId).populate('singleclient').exec();
    if (!restaurantDoc) {
      throwApplicationError(HttpStatus.NOT_FOUND, `Restaurant with id ${restaurantId} does not exist`);
    }
    const restaurant: Restaurant = this.restaurantMapper.toDomain(restaurantDoc);
    return restaurant;
  }

  async getRestaurants(): Promise<Restaurant[]> {
    const restaurantDoc = await this.DocumentModel.find().populate('singleclient').exec();
    const restaurants: Restaurant[] = restaurantDoc.map((doc) => this.restaurantMapper.toDomain(doc));
    return restaurants;
  }

  async getRestaurantWithSingleClientDetails(
    restaurant: Restaurant,
    singleclientId: Types.ObjectId,
  ): Promise<Restaurant> {
    const singleclient: Result<SingleClient> = await this.singleclientRepository.findById(singleclientId);
    const singleclientData = singleclient.getValue();
    restaurant.singleclient = singleclientData;
    return restaurant;
  }
}
