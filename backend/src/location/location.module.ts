import { DocumentDatabaseModule } from './../infrastructure/database/document-database.module';
import { TYPES } from './../application/constants/types';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import {
  LocationDataModel,
  LocationSchema,
} from '../infrastructure/data_access/repositories/schemas/location.schema';
import { LocationService } from './location.service';
import { LocationRepository } from './../infrastructure/data_access/repositories/location.repository';
import { LocationsController } from './location.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    DocumentDatabaseModule,
    MongooseModule.forFeature([
      { name: LocationDataModel.name, schema: LocationSchema },
    ]),
  ],
  controllers: [LocationsController],
  providers: [
    { provide: TYPES.ILocationService, useClass: LocationService },
    LocationRepository,
  ],
})
export class LocationModule {}
