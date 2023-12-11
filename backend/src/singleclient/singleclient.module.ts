import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessControlService } from 'src/shared/services/access_control.service';
import { RoleService } from 'src/shared/services/role_service';
import { SingleClientRepository } from '../infrastructure/data_access/repositories/singleclient.repository';
import { TYPES } from '../application/constants/types';
import { AuditMapper } from '../audit/audit.mapper';
import { AuthModule } from '../infrastructure/auth/auth.module';
import { AuthService } from '../infrastructure/auth/auth.service';
import { ContextService } from '../infrastructure/context/context.service';
import {
  SingleClientDataModel,
  SingleClientSchema,
} from './../infrastructure/data_access/repositories/schemas/singleclient.schema';
import { ContextMiddleWare } from '../infrastructure/middlewares/context.middleware';
import { ValidateUser } from '../utils/context-validation';
import { SingleClientController } from './singleclient.controller';
import { SingleClientMapper } from './singleclient.mapper';
import { SingleClientService } from './singleclient.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: SingleClientDataModel.name, schema: SingleClientSchema }]), AuthModule],
  providers: [
    SingleClientRepository,
    SingleClientMapper,
    AuditMapper,
    JwtService,
    ContextService,
    { provide: TYPES.ISingleClientService, useClass: SingleClientService },
    { provide: TYPES.IAuthService, useClass: AuthService },
    { provide: TYPES.IContextService, useClass: ContextService },
    { provide: TYPES.IValidateUser, useClass: ValidateUser },
    { provide: TYPES.IMapper, useClass: SingleClientMapper },
    { provide: TYPES.IAccessControlService, useClass: AccessControlService },
    { provide: TYPES.IRoleService, useClass: RoleService },
  ],
  controllers: [SingleClientController],
})
export class SingleClientModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ContextMiddleWare)
      .exclude(
        { path: 'api/singleclients/signin', method: RequestMethod.POST },
        { path: 'api/singleclients/signup', method: RequestMethod.POST },
      )
      .forRoutes(SingleClientController);
  }
}
