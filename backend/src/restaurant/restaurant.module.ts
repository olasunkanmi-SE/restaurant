import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MerchantRepository } from '../infrastructure/data_access/repositories/merchant.repository';
import { MenuMapper } from '../menu/menu.mapper';
import { AddonMapper } from './../addon/addon.mapper';
import { TYPES } from './../application/constants/types';
import { AuditMapper } from './../audit/audit.mapper';
import { AuthService } from './../infrastructure/auth/auth.service';
import { ContextService } from './../infrastructure/context/context.service';
import { LocationRepository } from './../infrastructure/data_access/repositories/location.repository';
import { MenuRepository } from './../infrastructure/data_access/repositories/menu.repopsitory';
import { RestaurantRepository } from './../infrastructure/data_access/repositories/restaurant.repository';
import { LocationData, LocationSchema } from './../infrastructure/data_access/repositories/schemas/location.schema';
import { MenuDataModel, MenuSchema } from './../infrastructure/data_access/repositories/schemas/menu.schema';
import {
  MerchantDataModel,
  MerchantSchema,
} from './../infrastructure/data_access/repositories/schemas/merchant.schema';
import {
  RestaurantData,
  RestaurantSchema,
} from './../infrastructure/data_access/repositories/schemas/restaurant.schema';
import { ContextMiddleWare } from './../infrastructure/middlewares/context.middleware';
import { ItemMapper } from './../item/item.mapper';
import { LocationMapper } from './../location/location.mapper';
import { MerchantMapper } from './../merchant/merchant.mapper';
import { MerchantService } from './../merchant/merchant.service';
import { ValidateUser } from './../utils/context-validation';
import { RestaurantsController } from './restaurant.controller';
import { RestaurantMapper } from './restaurant.mapper';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LocationData.name, schema: LocationSchema },
      { name: RestaurantData.name, schema: RestaurantSchema },
      { name: MerchantDataModel.name, schema: MerchantSchema },
      { name: MenuDataModel.name, schema: MenuSchema },
    ]),
  ],
  controllers: [RestaurantsController],
  providers: [
    JwtService,
    { provide: TYPES.IRestaurantService, useClass: RestaurantService },
    { provide: TYPES.IRestaurantRepository, useClass: RestaurantRepository },
    { provide: TYPES.IContextService, useClass: ContextService },
    { provide: TYPES.IValidateUser, useClass: ValidateUser },
    { provide: TYPES.IMerchantService, useClass: MerchantService },
    { provide: TYPES.IAuthService, useClass: AuthService },
    { provide: TYPES.IMapper, useClass: RestaurantMapper },
    { provide: TYPES.IMenuRepository, useClass: MenuRepository },
    RestaurantMapper,
    AuditMapper,
    LocationMapper,
    LocationRepository,
    MerchantRepository,
    MerchantMapper,
    MenuMapper,
    ItemMapper,
    AddonMapper,
  ],
})
export class RestaurantModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleWare).exclude().forRoutes(RestaurantsController);
  }
}
