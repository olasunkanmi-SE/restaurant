import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessControlService } from 'src/shared/services/access_control.service';
import { RoleService } from 'src/shared/services/role_service';
import { MerchantRepository } from '../infrastructure/data_access/repositories/merchant.repository';
import { TYPES } from './../application/constants/types';
import { AuditMapper } from './../audit/audit.mapper';
import { AuthModule } from './../infrastructure/auth/auth.module';
import { AuthService } from './../infrastructure/auth/auth.service';
import { ContextService } from './../infrastructure/context/context.service';
import {
  MerchantDataModel,
  MerchantSchema,
} from './../infrastructure/data_access/repositories/schemas/merchant.schema';
import { ContextMiddleWare } from './../infrastructure/middlewares/context.middleware';
import { ValidateUser } from './../utils/context-validation';
import { MerchantController } from './merchant.controller';
import { MerchantMapper } from './merchant.mapper';
import { MerchantService } from './merchant.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: MerchantDataModel.name, schema: MerchantSchema }]), AuthModule],
  providers: [
    MerchantRepository,
    MerchantMapper,
    AuditMapper,
    JwtService,
    ContextService,
    { provide: TYPES.IMerchantService, useClass: MerchantService },
    { provide: TYPES.IAuthService, useClass: AuthService },
    { provide: TYPES.IContextService, useClass: ContextService },
    { provide: TYPES.IValidateUser, useClass: ValidateUser },
    { provide: TYPES.IMapper, useClass: MerchantMapper },
    { provide: TYPES.IAccessControlService, useClass: AccessControlService },
    { provide: TYPES.IRoleService, useClass: RoleService },
  ],
  controllers: [MerchantController],
})
export class MerchantModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ContextMiddleWare)
      .exclude(
        { path: 'api/merchants/signin', method: RequestMethod.POST },
        { path: 'api/merchants/signup', method: RequestMethod.POST },
      )
      .forRoutes(MerchantController);
  }
}
