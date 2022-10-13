import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ILocationService } from './location-service.interface';
import { TYPES } from './../application/constants/types';
import { CreateLocationDto } from './create-location.dto';

@Controller('locations')
export class LocationsController {
  constructor(
    @Inject(TYPES.ILocationService)
    private readonly locationService: ILocationService,
  ) {}

  @Post()
  async createLocation(
    @Res() response,
    @Body() createLocationDto: CreateLocationDto,
  ) {
    return this.locationService.createLocation(createLocationDto);
  }

  @Get()
  async getRestaurantLocations(@Res() response) {
    const restaurantLocations =
      await this.locationService.getAllRestaurantLocations();
    //Use the Result.ok to return your response
    return response.status(HttpStatus.OK).json({
      message: 'restaurants location retrieved successfully',
      restaurantLocations,
    });
  }
}
