import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { GenericDocumentRepository } from '../../database/mongoDB/generic-document.repository';
import { Result } from './../../../domain/result/result';
import { Merchant } from './../../../merchant/merchant';
import { Restaurant } from './../../../restaurant/restaurant';
import { RestaurantMapper } from './../../../restaurant/restaurant.mapper';
import { MerchantRepository } from './merchant.repository';
import { IRestaurantRepository } from './interfaces/restaurant-repository.interface';
import { RestaurantData, RestaurantDocument } from './schemas';

export class RestaurantRepository
  extends GenericDocumentRepository<Restaurant, RestaurantDocument>
  implements IRestaurantRepository
{
  restaurantMapper: RestaurantMapper;
  constructor(
    @InjectModel(RestaurantData.name)
    restaurantModel: Model<RestaurantDocument>,
    @InjectConnection() connection: Connection,
    private readonly merchantRepository: MerchantRepository,
    restaurantMapper: RestaurantMapper,
  ) {
    super(restaurantModel, connection, restaurantMapper);
    this.restaurantMapper = restaurantMapper;
  }

  async getRestaurant(restaurantId: Types.ObjectId): Promise<Restaurant> {
    const restaurantDoc = await this.DocumentModel.findById(restaurantId)
      .populate('merchant')
      .populate(this.populateDataModel());
    const restaurant: Restaurant = this.restaurantMapper.toDomain(restaurantDoc);
    return restaurant;
  }

  async getRestaurants(): Promise<Restaurant[]> {
    const restaurantDoc = await this.DocumentModel.find().populate('merchant').populate(this.populateDataModel());
    const restaurants: Restaurant[] = restaurantDoc.map((doc) => this.restaurantMapper.toDomain(doc));
    return restaurants;
  }

  async getRestaurantWithMerchantDetails(restaurant: Restaurant, merchantId: Types.ObjectId): Promise<Restaurant> {
    const merchant: Result<Merchant> = await this.merchantRepository.findById(merchantId);
    const merchantData = merchant.getValue();
    restaurant.merchant = merchantData;
    return restaurant;
  }

  private populateDataModel() {
    return {
      path: 'menus',
      populate: {
        path: 'items',
        populate: {
          path: 'addons',
          populate: {
            path: 'category',
          },
        },
      },
    };
  }
}
