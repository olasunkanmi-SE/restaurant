import { Result } from './../domain/result/result';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ILocationService } from './location-service.interface';
import { TYPES } from './../application/constants/types';
import { CreateLocationDTO } from './create-location.dto';
import { ILocationResponseDTO } from './location-response.dto';

@Controller('locations')
export class LocationsController {
  constructor(
    @Inject(TYPES.ILocationService)
    private readonly locationService: ILocationService,
  ) {}

  @Post()
  async createLocation(
    @Body() request: CreateLocationDTO,
  ): Promise<Result<ILocationResponseDTO>> {
    return this.locationService.createLocation(request);
  }

  @Get()
  async getRestaurantLocations(): Promise<Result<ILocationResponseDTO[]>> {
    return this.locationService.getAllRestaurantLocations();
  }
}
