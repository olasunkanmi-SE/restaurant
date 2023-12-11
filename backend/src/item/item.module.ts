import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { SingleClientRepository } from '../infrastructure/data_access/repositories/singleclient.repository';
import { AddonMapper } from './../addon/addon.mapper';
import { AddonDataModel, AddonSchema } from './../addon/addon.schema';
import { AddonService } from './../addon/addon.service';
import { TYPES } from './../application/constants/types';
import { AuditMapper } from './../audit/audit.mapper';
import { CategoryMapper } from './../category/category.mapper';
import { AuthService } from './../infrastructure/auth/auth.service';
import { ContextService } from './../infrastructure/context/context.service';
import { AddonRepository } from './../infrastructure/data_access/repositories/addon.repository';
import { CategoryRepository } from './../infrastructure/data_access/repositories/category.repository';
import { ITemRepository } from './../infrastructure/data_access/repositories/item.repository';
import {
  CategoryDataModel,
  CategorySchema,
} from './../infrastructure/data_access/repositories/schemas/category.schema';
import { ItemDataModel, ItemSchema } from './../infrastructure/data_access/repositories/schemas/item.schema';
import {
  SingleClientDataModel,
  SingleClientSchema,
} from './../infrastructure/data_access/repositories/schemas/singleclient.schema';
import { ContextMiddleWare } from './../infrastructure/middlewares/context.middleware';
import { SingleClientMapper } from './../singleclient/singleclient.mapper';
import { SingleClientService } from './../singleclient/singleclient.service';
import { ValidateUser } from './../utils/context-validation';
import { ItemController } from './item.controller';
import { ItemMapper } from './item.mapper';
import { ItemService } from './item.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ItemDataModel.name, schema: ItemSchema },
      { name: SingleClientDataModel.name, schema: SingleClientSchema },
      { name: AddonDataModel.name, schema: AddonSchema },
      { name: CategoryDataModel.name, schema: CategorySchema },
    ]),
  ],
  controllers: [ItemController],
  providers: [
    { provide: TYPES.IContextService, useClass: ContextService },
    { provide: TYPES.ISingleClientService, useClass: SingleClientService },
    { provide: TYPES.IAuthService, useClass: AuthService },
    { provide: TYPES.IValidateUser, useClass: ValidateUser },
    { provide: TYPES.IItemService, useClass: ItemService },
    { provide: TYPES.IAddonService, useClass: AddonService },
    { provide: TYPES.IaddonRepository, useClass: AddonRepository },
    ITemRepository,
    ItemMapper,
    SingleClientRepository,
    SingleClientMapper,
    JwtService,
    AuditMapper,
    AddonRepository,
    AddonMapper,
    AddonRepository,
    CategoryRepository,
    CategoryMapper,
  ],
})
export class ItemModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleWare).exclude().forRoutes(ItemController);
  }
}
