import { TYPES } from './application/constants/types';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ApplicationExceptionsFilter,
  ApplicationLogger,
} from './infrastructure';
import { LocationModule } from './location/module/location.module';

@Module({
  imports: [LocationModule],
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
