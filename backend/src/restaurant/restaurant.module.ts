import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantRepository } from './../infrastructure/data_access/repositories/restaurant.repository';
import { LocationRepository } from './../infrastructure/data_access/repositories/location.repository';
import {
  RestaurantDataDocument,
  RestaurantSchema,
} from './../infrastructure/data_access/repositories/schemas/restaurant.schema';
import {
  LocationDataDocument,
  LocationSchema,
} from './../infrastructure/data_access/repositories/schemas/location.schema';
import { RestaurantsController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { TYPES } from './../application/constants/types';
import { RestaurantMapper } from './restaurant.mapper';
import { AuditMapper } from './../audit/audit.mapper';
import { LocationMapper } from './../location/location.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LocationDataDocument.name, schema: LocationSchema },
      { name: RestaurantDataDocument.name, schema: RestaurantSchema },
    ]),
  ],
  controllers: [RestaurantsController],
  providers: [
    { provide: TYPES.IRestaurantService, useClass: RestaurantService },
    RestaurantRepository,
    RestaurantMapper,
    AuditMapper,
    LocationMapper,
    LocationRepository,
  ],
})
export class RestaurantModule {}
