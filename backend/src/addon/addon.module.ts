import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TYPES } from 'src/application';
import { AuditMapper } from './../audit/audit.mapper';
import { AuthService } from './../infrastructure/auth/auth.service';
import { ContextService } from './../infrastructure/context/context.service';
import { AddonRepository } from './../infrastructure/data_access/repositories/addon.repository';
import { MerchantRepository } from './../infrastructure/data_access/repositories/merchant.repository';
import {
  MerchantDataModel,
  MerchantSchema,
} from './../infrastructure/data_access/repositories/schemas/merchant.schema';
import { ContextMiddleWare } from './../infrastructure/middlewares/context.middleware';
import { MerchantMapper } from './../merchant/merchant.mapper';
import { MerchantService } from './../merchant/merchant.service';
import { ValidateUser } from './../utils/context-validation';
import { AddonController } from './addon.controller';
import { AddonMapper } from './addon.mapper';
import { AddonDataModel, AddonSchema } from './addon.schema';
import { AddonService } from './addon.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AddonDataModel.name, schema: AddonSchema },
      { name: MerchantDataModel.name, schema: MerchantSchema },
    ]),
  ],
  controllers: [AddonController],
  providers: [
    { provide: TYPES.IContextService, useClass: ContextService },
    { provide: TYPES.IMerchantService, useClass: MerchantService },
    { provide: TYPES.IAuthService, useClass: AuthService },
    { provide: TYPES.IValidateUser, useClass: ValidateUser },
    { provide: TYPES.IAddonService, useClass: AddonService },
    AddonRepository,
    AddonMapper,
    MerchantRepository,
    MerchantMapper,
    JwtService,
    AuditMapper,
  ],
})
export class AddonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleWare).exclude().forRoutes(AddonController);
  }
}
