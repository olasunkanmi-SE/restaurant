import { Result } from './../domain/result/result';
import { Audit } from './../domain/audit/audit';
import { ILocationService } from './location-service.interface';
import { Injectable } from '@nestjs/common';
import { LocationRepository } from './../infrastructure/data_access/repositories/location.repository';
import { CreateLocationDto } from './create-location.dto';
import { Location } from './location';
import { LocationMapper } from './location.mapper';
import { LocationParser } from './location.parser';
import { ILocationResponseDTO } from './location-response.dto';

@Injectable()
export class LocationService implements ILocationService {
  constructor(
    private readonly locationRepository: LocationRepository,
    private readonly locationMapper: LocationMapper,
  ) {}

  async createLocation(
    createLocationDto: CreateLocationDto,
  ): Promise<Result<ILocationResponseDTO>> {
    //create a context function that takes an argument and does this
    //retrieve user information from jwt.
    const audit: Audit = Audit.create({
      auditCreatedDateTime: new Date(),
      auditCreatedBy: 'Ola',
    }).getValue();
    const location: Location = Location.create(createLocationDto).getValue();
    location.audit = audit;
    await this.locationRepository.create(
      this.locationMapper.toPersistence(location),
    );
    return Result.ok(LocationParser.createLocationResponse(location));
  }

  async getAllRestaurantLocations(): Promise<Result<ILocationResponseDTO[]>> {
    const locations: Location[] = [];
    const models = await this.locationRepository.find({});
    if (models.length) {
      for (const model of models) {
        locations.push(this.locationMapper.toDomain(model));
      }
    }
    return Result.ok(
      LocationParser.createLocationsResponse(locations),
      'Restaurants retrieved successfully',
    );
  }
}
