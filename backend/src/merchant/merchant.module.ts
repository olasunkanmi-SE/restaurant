import { TYPES } from './../application/constants/types';
import { MerchantController } from './merchant.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditMapper } from './../audit/audit.mapper';
import { MerchantRepository } from './../infrastructure/data_access/repositories/merchant-repository';
import {
  MerchantData,
  MerchantSchema,
} from './../infrastructure/data_access/repositories/schemas/merchant.schema';
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
    { provide: TYPES.IMerchantService, useClass: MerchantService },
  ],
  controllers: [MerchantController],
})
export class MerchantModule {}
