import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TYPES } from './../application/constants/types';
import { AuditMapper } from './../audit/audit.mapper';
import { AuthService } from './../infrastructure/auth/auth.service';
import { ContextService } from './../infrastructure/context/context.service';
import { ITemRepository } from './../infrastructure/data_access/repositories/item.repository';
import { MerchantRepository } from './../infrastructure/data_access/repositories/merchant-repository';
import { ItemDataModel, ItemSchema } from './../infrastructure/data_access/repositories/schemas/item.schema';
import {
  MerchantDataModel,
  MerchantSchema,
} from './../infrastructure/data_access/repositories/schemas/merchant.schema';
import { MerchantMapper } from './../merchant/merchant.mapper';
import { MerchantService } from './../merchant/merchant.service';
import { ValidateUser } from './../utils/context-validation';
import { ItemMapper } from './item.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ItemDataModel.name, schema: ItemSchema },
      { name: MerchantDataModel.name, schema: MerchantSchema },
    ]),
  ],
  controllers: [],
  providers: [
    { provide: TYPES.IContextService, useClass: ContextService },
    { provide: TYPES.IMerchantService, useClass: MerchantService },
    { provide: TYPES.IAuthService, useClass: AuthService },
    { provide: TYPES.IValidateUser, useClass: ValidateUser },
    ITemRepository,
    ItemMapper,
    MerchantRepository,
    MerchantMapper,
    JwtService,
    AuditMapper,
  ],
})
export class ItemModule {}
