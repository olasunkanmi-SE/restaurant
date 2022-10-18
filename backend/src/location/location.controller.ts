import { Result } from './../domain/result/result';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ILocationService } from './location-service.interface';
import { TYPES } from './../application/constants/types';
import { CreateLocationDto } from './create-location.dto';
import { ILocationResponseDTO } from './location-response.dto';

@Controller('locations')
export class LocationsController {
  constructor(
    @Inject(TYPES.ILocationService)
    private readonly locationService: ILocationService,
  ) {}

  @Post()
  async createLocation(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<Result<ILocationResponseDTO>> {
    return this.locationService.createLocation(createLocationDto);
  }

  @Get()
  async getRestaurantLocations(): Promise<Result<ILocationResponseDTO[]>> {
    return await this.locationService.getAllRestaurantLocations();
  }
}
