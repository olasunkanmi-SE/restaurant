import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MerchantRepository, RestaurantData, RestaurantRepository, RestaurantSchema } from '../infrastructure';
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
import { MenuRepository } from './../infrastructure/data_access/repositories/menu.repopsitory';
import {
  CategoryDataModel,
  CategorySchema,
} from './../infrastructure/data_access/repositories/schemas/category.schema';
import { ItemDataModel, ItemSchema } from './../infrastructure/data_access/repositories/schemas/item.schema';
import { MenuDataModel, MenuSchema } from './../infrastructure/data_access/repositories/schemas/menu.schema';
import {
  MerchantDataModel,
  MerchantSchema,
} from './../infrastructure/data_access/repositories/schemas/merchant.schema';
import { ItemMapper } from './../item/item.mapper';
import { MerchantMapper } from './../merchant/merchant.mapper';
import { MerchantService } from './../merchant/merchant.service';
import { ValidateUser } from './../utils/context-validation';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { RestaurantMapper } from 'src/restaurant';
import { LocationMapper } from 'src/location';
import { ContextMiddleWare } from 'src/infrastructure/middlewares';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MenuDataModel.name, schema: MenuSchema },
      { name: ItemDataModel.name, schema: ItemSchema },
      { name: MerchantDataModel.name, schema: MerchantSchema },
      { name: CategoryDataModel.name, schema: CategorySchema },
      { name: AddonDataModel.name, schema: AddonSchema },
      { name: RestaurantData.name, schema: RestaurantSchema },
    ]),
  ],
  controllers: [MenuController],
  providers: [
    MenuRepository,
    MenuMapper,
    ItemMapper,
    AuditMapper,
    MerchantRepository,
    MerchantMapper,
    JwtService,
    AddonMapper,
    CategoryMapper,
    CategoryRepository,
    RestaurantMapper,
    LocationMapper,
    { provide: TYPES.IItemRepository, useClass: ITemRepository },
    { provide: TYPES.IAddonRepository, useClass: AddonRepository },
    { provide: TYPES.IContextService, useClass: ContextService },
    { provide: TYPES.IMerchantService, useClass: MerchantService },
    { provide: TYPES.IAuthService, useClass: AuthService },
    { provide: TYPES.IValidateUser, useClass: ValidateUser },
    { provide: TYPES.IMenuService, useClass: MenuService },
    { provide: TYPES.IRestaurantRepository, useClass: RestaurantRepository },
  ],
})
export class MenuModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ContextMiddleWare)
      .exclude({ path: 'api/menus', method: RequestMethod.GET }, { path: 'api/menus/:id', method: RequestMethod.GET })
      .forRoutes(MenuController);
  }
}
