import { IRestaurantRepository } from './restaurant-repository.interface';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { GenericDocumentRepository } from '../../database/mongoDB/generic-document.repository';
import { Merchant } from './../../../merchant/merchant';
import { MerchantMapper } from './../../../merchant/merchant.mapper';
import { Restaurant } from './../../../restaurant/restaurant';
import { MerchantRepository } from './merchant-repository';
import {
  MerchantDocument,
  RestaurantData,
  RestaurantDocument,
} from './schemas';

export class RestaurantRepository
  extends GenericDocumentRepository<RestaurantDocument>
  implements IRestaurantRepository
{
  constructor(
    @InjectModel(RestaurantData.name)
    restaurantModel: Model<RestaurantDocument>,
    @InjectConnection() connection: Connection,
    private readonly merchantRepository: MerchantRepository,
    private readonly merchantMapper: MerchantMapper,
  ) {
    super(restaurantModel, connection);
  }

  async getRestaurantWithMerchantDetails(
    restaurant: Restaurant,
    merchantId: Types.ObjectId,
  ): Promise<Restaurant> {
    const merchantDoc: MerchantDocument = await (
      await this.merchantRepository.findById(merchantId)
    ).getValue();
    const merchant: Merchant = this.merchantMapper.toDomain(merchantDoc);
    restaurant.merchant = merchant;
    return restaurant;
  }
}
