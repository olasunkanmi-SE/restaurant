import { Result } from './../domain/result/result';
import { Audit } from './../domain/audit/audit';
import { ILocationService } from './location-service.interface';
import { Injectable } from '@nestjs/common';
import { LocationRepository } from './../infrastructure/data_access/repositories/location.repository';
import { CreateLocationDTO } from './create-location.dto';
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
    createLocationDTO: CreateLocationDTO,
  ): Promise<Result<ILocationResponseDTO>> {
    //create a context function that takes an argument and does this
    //retrieve user information from jwt.
    const audit: Audit = Audit.createInsertContext().getValue();
    const location: Location = Location.create({
      ...createLocationDTO,
      audit,
    }).getValue();
    const locationDocument = await this.locationRepository.create(
      this.locationMapper.toPersistence(location),
    );
    return Result.ok(
      LocationParser.createLocationResponse(
        this.locationMapper.toDomain(locationDocument),
      ),
    );
  }

  async getAllRestaurantLocations(): Promise<Result<ILocationResponseDTO[]>> {
    const locations: Location[] = [];
    const documents = await this.locationRepository.find({});
    if (documents.length) {
      for (const model of documents) {
        locations.push(this.locationMapper.toDomain(model));
      }
    }
    return Result.ok(
      LocationParser.createLocationsResponse(locations),
      'Restaurant locations retrieved successfully',
    );
  }
}
