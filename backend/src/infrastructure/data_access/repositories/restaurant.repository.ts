import { Result } from './../../../domain/result/result';
import { IMapper } from './../../../domain/mapper/mapper';
import { TYPES } from './../../../application/constants/types';
import { IRestaurantRepository } from './restaurant-repository.interface';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { GenericDocumentRepository } from '../../database/mongoDB/generic-document.repository';
import { Merchant } from './../../../merchant/merchant';
import { Restaurant } from './../../../restaurant/restaurant';
import { MerchantRepository } from './merchant-repository';
import { RestaurantData, RestaurantDocument } from './schemas';
import { Inject } from '@nestjs/common';

export class RestaurantRepository
  extends GenericDocumentRepository<Restaurant, RestaurantDocument>
  implements IRestaurantRepository
{
  constructor(
    @InjectModel(RestaurantData.name)
    restaurantModel: Model<RestaurantDocument>,
    @InjectConnection() connection: Connection,
    private readonly merchantRepository: MerchantRepository,
    @Inject(TYPES.IMapper) restaurantMapper: IMapper<Restaurant, RestaurantDocument>,
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
