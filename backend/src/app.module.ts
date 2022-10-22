import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TYPES } from './application/constants/types';
import {
  ApplicationExceptionsFilter,
  ApplicationLogger,
} from './infrastructure';
import { LocationModule } from './location/location.module';
import { RestaurantModule } from './restaurant/restaurant.module';

import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    LocationModule,
    RestaurantModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ApplicationExceptionsFilter,
    },
    { provide: TYPES.IApplicationLogger, useClass: ApplicationLogger },
  ],
})
export class AppModule {}
