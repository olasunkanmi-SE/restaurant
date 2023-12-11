import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { SingleClientRepository } from '../infrastructure/data_access/repositories/singleclient.repository';
import { MenuMapper } from '../menu/menu.mapper';
import { AddonMapper } from './../addon/addon.mapper';
import { AddonDataModel, AddonSchema } from './../addon/addon.schema';
import { TYPES } from './../application/constants/types';
import { AuditMapper } from './../audit/audit.mapper';
import { CategoryMapper } from './../category/category.mapper';
import { AuthService } from './../infrastructure/auth/auth.service';
import { ContextService } from './../infrastructure/context/context.service';
import { AddonRepository } from './../infrastructure/data_access/repositories/addon.repository';
import { CategoryRepository } from './../infrastructure/data_access/repositories/category.repository';
import { ITemRepository } from './../infrastructure/data_access/repositories/item.repository';
import { LocationRepository } from './../infrastructure/data_access/repositories/location.repository';
import { MenuRepository } from './../infrastructure/data_access/repositories/menu.repopsitory';
import { RestaurantRepository } from './../infrastructure/data_access/repositories/restaurant.repository';
import {
  CategoryDataModel,
  CategorySchema,
} from './../infrastructure/data_access/repositories/schemas/category.schema';
import { ItemDataModel, ItemSchema } from './../infrastructure/data_access/repositories/schemas/item.schema';
import { LocationData, LocationSchema } from './../infrastructure/data_access/repositories/schemas/location.schema';
import { MenuDataModel, MenuSchema } from './../infrastructure/data_access/repositories/schemas/menu.schema';
import {
  SingleClientDataModel,
  SingleClientSchema,
} from './../infrastructure/data_access/repositories/schemas/singleclient.schema';
import {
  RestaurantData,
  RestaurantSchema,
} from './../infrastructure/data_access/repositories/schemas/restaurant.schema';
import { ContextMiddleWare } from './../infrastructure/middlewares/context.middleware';
import { ItemMapper } from './../item/item.mapper';
import { LocationMapper } from './../location/location.mapper';
import { SingleClientMapper } from './../singleclient/singleclient.mapper';
import { SingleClientService } from './../singleclient/singleclient.service';
import { ValidateUser } from './../utils/context-validation';
import { RestaurantsController } from './restaurant.controller';
import { RestaurantMapper } from './restaurant.mapper';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LocationData.name, schema: LocationSchema },
      { name: RestaurantData.name, schema: RestaurantSchema },
      { name: SingleClientDataModel.name, schema: SingleClientSchema },
      { name: MenuDataModel.name, schema: MenuSchema },
      { name: CategoryDataModel.name, schema: CategorySchema },
      { name: ItemDataModel.name, schema: ItemSchema },
      { name: AddonDataModel.name, schema: AddonSchema },
    ]),
  ],
  controllers: [RestaurantsController],
  providers: [
    JwtService,
    { provide: TYPES.IRestaurantService, useClass: RestaurantService },
    { provide: TYPES.IRestaurantRepository, useClass: RestaurantRepository },
    { provide: TYPES.IContextService, useClass: ContextService },
    { provide: TYPES.IValidateUser, useClass: ValidateUser },
    { provide: TYPES.ISingleClientService, useClass: SingleClientService },
    { provide: TYPES.IAuthService, useClass: AuthService },
    { provide: TYPES.IMapper, useClass: RestaurantMapper },
    { provide: TYPES.IMenuRepository, useClass: MenuRepository },
    { provide: TYPES.IItemRepository, useClass: ITemRepository },
    { provide: TYPES.IAddonRepository, useClass: AddonRepository },
    RestaurantMapper,
    AuditMapper,
    LocationMapper,
    LocationRepository,
    SingleClientRepository,
    SingleClientMapper,
    MenuMapper,
    ItemMapper,
    AddonMapper,
    CategoryMapper,
    CategoryRepository,
  ],
})
export class RestaurantModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleWare).exclude().forRoutes(RestaurantsController);
  }
}
