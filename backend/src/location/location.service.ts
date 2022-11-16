import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from './../application/constants/types';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { Context } from './../infrastructure/context';
import { ContextService } from './../infrastructure/context/context.service';
import { LocationRepository } from './../infrastructure/data_access/repositories/location.repository';
import { LocationDocument } from './../infrastructure/data_access/repositories/schemas/location.schema';
import { CreateLocationDTO } from './create-location.dto';
import { Location } from './location';
import { ILocationResponseDTO } from './location-response.dto';
import { ILocationService } from './location-service.interface';
import { LocationMapper } from './location.mapper';
import { LocationParser } from './location.parser';

@Injectable()
export class LocationService implements ILocationService {
  constructor(
    private readonly locationRepository: LocationRepository,
    private readonly locationMapper: LocationMapper,
    @Inject(TYPES.IContextService)
    private readonly contextService: ContextService,
  ) {}

  async createLocation(
    createLocationDTO: CreateLocationDTO,
  ): Promise<Result<ILocationResponseDTO>> {
    const context: Context = this.contextService.getContext();
    const audit: Audit = Audit.createInsertContext(context);
    const location: Location = Location.create({
      ...createLocationDTO,
      audit,
    }).getValue();
    const locationDocument = await this.locationRepository.create(
      this.locationMapper.toPersistence(location),
    );
    return Result.ok(
      LocationParser.createLocationResponse(
        this.locationMapper.toDomain(locationDocument.getValue()),
      ),
    );
  }

  async getAllRestaurantLocations(): Promise<Result<ILocationResponseDTO[]>> {
    const locations: Location[] = [];
    const result: Result<LocationDocument[]> =
      await this.locationRepository.find({});
    const locationDocuments = result.getValue();
    if (locationDocuments.length) {
      for (const model of locationDocuments) {
        locations.push(this.locationMapper.toDomain(model));
      }
    }
    return Result.ok(
      LocationParser.createLocationsResponse(locations),
      'Restaurant locations retrieved successfully',
    );
  }

  async someFunctions(id: string) {
    if (Object.hasOwnProperty.call({}, '')) {
    }
  }
}
