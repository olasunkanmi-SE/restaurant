import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TYPES } from './../application/constants/types';
import { AuditMapper } from './../audit/audit.mapper';
import { AuthService } from './../infrastructure/auth/auth.service';
import { ContextService } from './../infrastructure/context/context.service';
import { CategoryRepository } from './../infrastructure/data_access/repositories/category.repository';
import { MerchantRepository } from './../infrastructure/data_access/repositories/merchant.repository';
import {
  CategoryDataModel,
  CategorySchema,
} from './../infrastructure/data_access/repositories/schemas/category.schema';
import {
  MerchantDataModel,
  MerchantSchema,
} from './../infrastructure/data_access/repositories/schemas/merchant.schema';
import { ContextMiddleWare } from './../infrastructure/middlewares/context.middleware';
import { MerchantMapper } from './../merchant/merchant.mapper';
import { MerchantService } from './../merchant/merchant.service';
import { ValidateUser } from './../utils/context-validation';
import { CategoryController } from './category.controller';
import { CategoryMapper } from './category.mapper';
import { CategoryService } from './category.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryDataModel.name, schema: CategorySchema },
      { name: MerchantDataModel.name, schema: MerchantSchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [
    { provide: TYPES.IContextService, useClass: ContextService },
    { provide: TYPES.IMerchantService, useClass: MerchantService },
    { provide: TYPES.IAuthService, useClass: AuthService },
    { provide: TYPES.IValidateUser, useClass: ValidateUser },
    { provide: TYPES.ICategoryService, useClass: CategoryService },
    CategoryRepository,
    JwtService,
    AuditMapper,
    MerchantRepository,
    MerchantMapper,
    CategoryMapper,
  ],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleWare).exclude().forRoutes(CategoryController);
  }
}
