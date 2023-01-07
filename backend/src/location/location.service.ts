import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from './../application/constants/types';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { Context } from './../infrastructure/context';
import { ContextService } from './../infrastructure/context/context.service';
import { LocationRepository } from './../infrastructure/data_access/repositories/location.repository';
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
    @Inject(TYPES.IContextService) private readonly contextService: ContextService,
  ) {}

  async createLocation(createLocationDTO: CreateLocationDTO): Promise<Result<ILocationResponseDTO>> {
    const context: Context = await this.contextService.getContext();
    const audit: Audit = Audit.createInsertContext(context);
    const location: Location = Location.create({
      ...createLocationDTO,
      audit,
    }).getValue();
    const locationEntity = this.locationMapper.toPersistence(location);
    const result: Result<Location> = await this.locationRepository.create(locationEntity);
    return Result.ok(LocationParser.createLocationResponse(result.getValue()));
  }

  async getAllRestaurantLocations(): Promise<Result<ILocationResponseDTO[]>> {
    const result: Result<Location[]> = await this.locationRepository.find({});
    const locations = result.getValue();
    return Result.ok(LocationParser.createLocationsResponse(locations), 'Restaurant locations retrieved successfully');
  }
}
