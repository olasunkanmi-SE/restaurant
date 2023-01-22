import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { GenericDocumentRepository } from '../../database/mongoDB/generic-document.repository';
import { Result } from './../../../domain/result/result';
import { Merchant } from './../../../merchant/merchant';
import { Restaurant } from './../../../restaurant/restaurant';
import { RestaurantMapper } from './../../../restaurant/restaurant.mapper';
import { MerchantRepository } from './merchant.repository';
import { IRestaurantRepository } from './restaurant-repository.interface';
import { RestaurantData, RestaurantDocument } from './schemas';

export class RestaurantRepository
  extends GenericDocumentRepository<Restaurant, RestaurantDocument>
  implements IRestaurantRepository
{
  constructor(
    @InjectModel(RestaurantData.name)
    restaurantModel: Model<RestaurantDocument>,
    @InjectConnection() connection: Connection,
    private readonly merchantRepository: MerchantRepository,
    restaurantMapper: RestaurantMapper,
  ) {
    super(restaurantModel, connection, restaurantMapper);
  }

  async getRestaurantWithMerchantDetails(restaurant: Restaurant, merchantId: Types.ObjectId): Promise<Restaurant> {
    const merchant: Result<Merchant> = await this.merchantRepository.findById(merchantId);
    const merchantData = merchant.getValue();
    restaurant.merchant = merchantData;
    return restaurant;
  }
}
