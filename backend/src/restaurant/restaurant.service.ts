import { Location } from './../location/location';
import { RestaurantParser } from './restaurant.parser';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { CreateRestaurantDTO } from './create-restaurant.dto';
import { RestaurantMapper } from './restaurant.mapper';
import { RestaurantRepository } from './../infrastructure/data_access/repositories/restaurant.repository';
import { IRestaurantResponseDTO } from './restaurant-response.dto';
import { Restaurant } from './restaurant';
export class RestaurantService {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly restaurantMapper: RestaurantMapper,
  ) {}

  async createRestaurant(
    createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<Result<IRestaurantResponseDTO>> {
    const audit: Audit = Audit.createInsertContext().getValue();
    const location: Location = Location.create(
      createRestaurantDTO.location,
    ).getValue();
    const restaurant: Restaurant = Restaurant.create({
      ...createRestaurantDTO,
      location,
      audit,
    }).getValue();
    await this.restaurantRepository.create(
      this.restaurantMapper.toPersistence(restaurant),
    );
    return Result.ok(RestaurantParser.createRestaurantResponse(restaurant));
  }
}
