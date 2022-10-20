import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Types } from 'mongoose';
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

  @Get('/:id')
  async getRestaurantById(
    @Param('id') restaurantId: Types.ObjectId,
  ): Promise<Result<IRestaurantResponseDTO>> {
    return this.restaurantService.getRestaurantById(restaurantId);
  }
}
