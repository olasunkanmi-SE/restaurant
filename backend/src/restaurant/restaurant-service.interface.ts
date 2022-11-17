import { Types } from 'mongoose';
import { Result } from './../domain/result/result';
import { CreateRestaurantDTO } from './create-restaurant.dto';
import { IRestaurantResponseDTO } from './restaurant-response.dto';

export interface IRestaurantService {
  createRestaurant(createRestaurantDTO: CreateRestaurantDTO): Promise<Result<IRestaurantResponseDTO>>;

  getRestaurants(): Promise<Result<IRestaurantResponseDTO[]>>;

  getRestaurantById(id: Types.ObjectId): Promise<Result<IRestaurantResponseDTO>>;
}
