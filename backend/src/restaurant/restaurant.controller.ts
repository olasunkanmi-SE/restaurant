import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { TYPES } from './../application/constants/types';
import { CreateRestaurantDTO } from './create-restaurant.dto';
import { IRestaurantService } from './restaurant-service.interface';
import { IRestaurantResponseDTO } from './restaurant-response.dto';
import { Result } from './../domain/result/result';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    @Inject(TYPES.IRestaurantService)
    private readonly restaurantService: IRestaurantService,
  ) {}

  @Post()
  async createRestaurant(
    @Body() request: CreateRestaurantDTO,
  ): Promise<Result<IRestaurantResponseDTO>> {
    return this.restaurantService.createRestaurant(request);
  }

  @Get()
  async getRestaurants(): Promise<Result<IRestaurantResponseDTO[]>> {
    return this.restaurantService.getRestaurants();
  }
}
