import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { TYPES } from './../application/constants/types';
import { Result } from './../domain/result/result';
import { CreateLocationDTO } from './create-location.dto';
import { ILocationResponseDTO } from './location-response.dto';
import { ILocationService } from './location-service.interface';

@Controller('locations')
export class LocationsController {
  constructor(
    @Inject(TYPES.ILocationService)
    private readonly locationService: ILocationService,
  ) {}

  @Post()
  async createLocation(@Body() request: CreateLocationDTO): Promise<Result<ILocationResponseDTO>> {
    return this.locationService.createLocation(request);
  }

  @Get()
  async getRestaurantLocations(): Promise<Result<ILocationResponseDTO[]>> {
    return this.locationService.getAllRestaurantLocations();
  }
}
