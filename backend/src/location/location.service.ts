import { ILocationService } from './location-service.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LocationRepository } from './../infrastructure/data_access/repositories/location.repository';
import { CreateLocationDto } from './create-location.dto';

@Injectable()
export class LocationService implements ILocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  async createLocation(createLocationDto: CreateLocationDto) {
    //create a context function that takes an argument and does this
    //retrieve user information from jwt.
    createLocationDto.auditCreatedDateTime = new Date().toISOString();
    createLocationDto.auditCreatedBy = 'Ola';
    const location = this.locationRepository.create(createLocationDto);
    return location;
  }

  async getAllRestaurantLocations() {
    const locations = await this.locationRepository.find({});
    if (!locations.length) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Restaurant locations not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return locations;
  }
}
