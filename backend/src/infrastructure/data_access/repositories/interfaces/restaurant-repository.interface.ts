import { Types } from 'mongoose';
import { Restaurant } from '../../../../restaurant/restaurant';
import { IGenericDocument } from '../../../database/mongoDB/generic-document.interface';
import { RestaurantDocument } from '../schemas';
export interface IRestaurantRepository extends IGenericDocument<Restaurant, RestaurantDocument> {
  getRestaurantWithSingleClientDetails(restaurant: Restaurant, singleclientId: Types.ObjectId): Promise<Restaurant>;
  getRestaurant(restaurantId: Types.ObjectId): Promise<Restaurant>;
  getRestaurants(): Promise<Restaurant[]>;
}
