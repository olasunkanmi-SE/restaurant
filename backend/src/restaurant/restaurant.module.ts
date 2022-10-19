import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RestaurantDataDocument,
  RestaurantSchema,
} from './../infrastructure/data_access/repositories/schemas/restaurant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RestaurantDataDocument.name, schema: RestaurantSchema },
    ]),
  ],
})
export class RestaurantModule {}
