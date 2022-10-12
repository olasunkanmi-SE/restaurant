import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DocumentDatabaseModule } from 'src/infrastructure';
import {
  Location,
  LocationSchema,
} from './../../infrastructure/data_access/repositories/schemas/location.schema';
import { LocationService } from '../service';

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
      { name: Location.name, schema: LocationSchema },
    ]),
  ],
  controllers: [],
  providers: [LocationService],
})
export class LocationModule {}
