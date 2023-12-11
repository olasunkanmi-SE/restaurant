import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';
import { GetCurrentUserId, AccessAuthGuard } from './../infrastructure';
import { TYPES } from './../application/constants/types';
import { Result } from './../domain/result/result';
import { CreateRestaurantDTO } from './create-restaurant.dto';
import { IRestaurantResponseDTO } from './restaurant-response.dto';
import { IRestaurantService } from './restaurant-service.interface';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    @Inject(TYPES.IRestaurantService)
    private readonly restaurantService: IRestaurantService,
  ) {}

  @Post()
  @UseGuards(AccessAuthGuard)
  async createRestaurant(
    @Body() request: CreateRestaurantDTO,
    @GetCurrentUserId() userId: Types.ObjectId,
  ): Promise<Result<IRestaurantResponseDTO>> {
    // eslint-disable-next-line prefer-const
    let { singleclientId, ...rest } = request;
    singleclientId = userId;
    return this.restaurantService.createRestaurant({ ...rest, singleclientId });
  }

  @Get()
  @UseGuards(AccessAuthGuard)
  async getRestaurants(): Promise<Result<IRestaurantResponseDTO[]>> {
    return this.restaurantService.getRestaurants();
  }

  @Get('/:id')
  @UseGuards(AccessAuthGuard)
  async getRestaurantById(@Param('id') restaurantId: Types.ObjectId): Promise<Result<IRestaurantResponseDTO>> {
    return this.restaurantService.getRestaurantById(restaurantId);
  }
}
