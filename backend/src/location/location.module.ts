import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LocationData,
  LocationSchema,
} from '../infrastructure/data_access/repositories/schemas/location.schema';
import { TYPES } from './../application/constants/types';
import { AuditMapper } from './../audit/audit.mapper';
import { LocationRepository } from './../infrastructure/data_access/repositories/location.repository';
import { LocationsController } from './location.controller';
import { LocationMapper } from './location.mapper';
import { LocationService } from './location.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LocationData.name, schema: LocationSchema },
    ]),
  ],
  controllers: [LocationsController],
  providers: [
    { provide: TYPES.ILocationService, useClass: LocationService },
    LocationRepository,
    LocationMapper,
    AuditMapper,
  ],
})
export class LocationModule {}
