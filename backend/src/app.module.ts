import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ApplicationExceptionsFilter,
  ApplicationLogger,
} from './infrastructure';
import { LocationModule } from './location/location.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { TYPES } from './application/constants/types';

import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';

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
