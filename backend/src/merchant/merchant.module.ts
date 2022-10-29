import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TYPES } from './../application/constants/types';
import { AuditMapper } from './../audit/audit.mapper';
import { AuthService } from './../infrastructure/auth/auth.service';
import { MerchantRepository } from './../infrastructure/data_access/repositories/merchant-repository';
import {
  MerchantData,
  MerchantSchema,
} from './../infrastructure/data_access/repositories/schemas/merchant.schema';
import { MerchantController } from './merchant.controller';
import { MerchantMapper } from './merchant.mapper';
import { MerchantService } from './merchant.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MerchantData.name, schema: MerchantSchema },
    ]),
  ],
  providers: [
    MerchantRepository,
    MerchantMapper,
    AuditMapper,
    JwtService,
    { provide: TYPES.IMerchantService, useClass: MerchantService },
    { provide: TYPES.IAuthService, useClass: AuthService },
  ],
  controllers: [MerchantController],
})
export class MerchantModule {}
