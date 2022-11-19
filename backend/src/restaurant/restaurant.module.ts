import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TYPES } from './../application/constants/types';
import { AuditMapper } from './../audit/audit.mapper';
import { ContextService } from './../infrastructure/context/context.service';
import { LocationRepository } from './../infrastructure/data_access/repositories/location.repository';
import { MerchantRepository } from './../infrastructure/data_access/repositories/merchant-repository';
import { RestaurantRepository } from './../infrastructure/data_access/repositories/restaurant.repository';
import { LocationData, LocationSchema } from './../infrastructure/data_access/repositories/schemas/location.schema';
import { MerchantData, MerchantSchema } from './../infrastructure/data_access/repositories/schemas/merchant.schema';
import {
  RestaurantData,
  RestaurantSchema,
} from './../infrastructure/data_access/repositories/schemas/restaurant.schema';
import { ContextMiddleWare } from './../infrastructure/middlewares/context.middleware';
import { LocationMapper } from './../location/location.mapper';
import { MerchantMapper } from './../merchant/merchant.mapper';
import { ValidateUser } from './../utils/context-validation';
import { RestaurantsController } from './restaurant.controller';
import { RestaurantMapper } from './restaurant.mapper';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LocationData.name, schema: LocationSchema },
      { name: RestaurantData.name, schema: RestaurantSchema },
      { name: MerchantData.name, schema: MerchantSchema },
    ]),
  ],
  controllers: [RestaurantsController],
  providers: [
    { provide: TYPES.IRestaurantService, useClass: RestaurantService },
    { provide: TYPES.IRestaurantRepository, useClass: RestaurantRepository },
    { provide: TYPES.IContextService, useClass: ContextService },
    { provide: TYPES.IValidateUser, useClass: ValidateUser },
    RestaurantMapper,
    AuditMapper,
    LocationMapper,
    LocationRepository,
    MerchantRepository,
    MerchantMapper,
  ],
})
export class RestaurantModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleWare).exclude().forRoutes(RestaurantsController);
  }
}
