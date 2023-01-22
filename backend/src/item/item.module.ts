import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TYPES } from './../application/constants/types';
import { AuditMapper } from './../audit/audit.mapper';
import { AuthService } from './../infrastructure/auth/auth.service';
import { ContextService } from './../infrastructure/context/context.service';
import { ITemRepository } from './../infrastructure/data_access/repositories/item.repository';
import { MerchantRepository } from '../infrastructure/data_access/repositories/merchant.repository';
import { ItemDataModel, ItemSchema } from './../infrastructure/data_access/repositories/schemas/item.schema';
import {
  MerchantDataModel,
  MerchantSchema,
} from './../infrastructure/data_access/repositories/schemas/merchant.schema';
import { ContextMiddleWare } from './../infrastructure/middlewares/context.middleware';
import { MerchantMapper } from './../merchant/merchant.mapper';
import { MerchantService } from './../merchant/merchant.service';
import { ValidateUser } from './../utils/context-validation';
import { ItemController } from './item.controller';
import { ItemMapper } from './item.mapper';
import { ItemService } from './item.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ItemDataModel.name, schema: ItemSchema },
      { name: MerchantDataModel.name, schema: MerchantSchema },
    ]),
  ],
  controllers: [ItemController],
  providers: [
    { provide: TYPES.IContextService, useClass: ContextService },
    { provide: TYPES.IMerchantService, useClass: MerchantService },
    { provide: TYPES.IAuthService, useClass: AuthService },
    { provide: TYPES.IValidateUser, useClass: ValidateUser },
    { provide: TYPES.IItemService, useClass: ItemService },
    ITemRepository,
    ItemMapper,
    MerchantRepository,
    MerchantMapper,
    JwtService,
    AuditMapper,
  ],
})
export class ItemModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleWare).exclude().forRoutes(ItemController);
  }
}
