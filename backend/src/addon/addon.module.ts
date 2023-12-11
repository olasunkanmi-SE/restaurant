import { SingleClientMapper } from '../singleclient/singleclient.mapper';
import { SingleClientRepository } from './../infrastructure/data_access/repositories/singleclient.repository';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TYPES } from '../application';
import { AuditMapper } from './../audit/audit.mapper';
import { CategoryMapper } from './../category/category.mapper';
import { AuthService } from './../infrastructure/auth/auth.service';
import { ContextService } from './../infrastructure/context/context.service';
import { AddonRepository } from './../infrastructure/data_access/repositories/addon.repository';
import { CategoryRepository } from './../infrastructure/data_access/repositories/category.repository';
import {
  CategoryDataModel,
  CategorySchema,
} from './../infrastructure/data_access/repositories/schemas/category.schema';
import { ContextMiddleWare } from './../infrastructure/middlewares/context.middleware';
import { ValidateUser } from './../utils/context-validation';
import { AddonController } from './addon.controller';
import { AddonMapper } from './addon.mapper';
import { AddonDataModel, AddonSchema } from './addon.schema';
import { AddonService } from './addon.service';
import { SingleClientDataModel, SingleClientSchema } from '../infrastructure';
import { SingleClientService } from 'src/singleclient/singleclient.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AddonDataModel.name, schema: AddonSchema },
      { name: SingleClientDataModel.name, schema: SingleClientSchema },
      { name: CategoryDataModel.name, schema: CategorySchema },
    ]),
  ],
  controllers: [AddonController],
  providers: [
    { provide: TYPES.IContextService, useClass: ContextService },
    { provide: TYPES.ISingleClientService, useClass: SingleClientService },
    { provide: TYPES.IAuthService, useClass: AuthService },
    { provide: TYPES.IValidateUser, useClass: ValidateUser },
    { provide: TYPES.IAddonService, useClass: AddonService },
    AddonRepository,
    AddonMapper,
    SingleClientRepository,
    SingleClientMapper,
    JwtService,
    AuditMapper,
    CategoryRepository,
    CategoryMapper,
  ],
})
export class AddonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleWare).exclude().forRoutes(AddonController);
  }
}
