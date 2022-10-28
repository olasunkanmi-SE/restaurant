import { IGenericDocument } from './../../database/mongoDB/generic-document.interface';
import { Types } from 'mongoose';
import { Restaurant } from './../../../restaurant/restaurant';
import { RestaurantDocument } from './schemas';
export interface IRestaurantRepository
  extends IGenericDocument<RestaurantDocument> {
  getRestaurantWithMerchantDetails(
    restaurant: Restaurant,
    merchantId: Types.ObjectId,
  ): Promise<Restaurant>;
}
