import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MenuModule } from './menu/menu.module';
import { RestaurantModule } from './restaurant/restaurant.module';

import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { AddonModule } from './addon/addon.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TYPES } from './application';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './infrastructure/auth';
import { ContextService } from './infrastructure/context';
import { ContextMiddleWare } from './infrastructure/middlewares';
import { ItemModule } from './item/item.module';
import { MerchantModule } from './merchant/merchant.module';
import { ApplicationExceptionsFilter, ApplicationLogger } from './infrastructure';
import { LocationModule } from './location';
import { OrderModule } from './order/order.module';
import { OrderStatusesModule } from './order_statuses/order_statuses.module';
import { OrderNotesModule } from './order_notes/order_notes.module';
import { OrderProcessingQueuesModule } from './order_processing_queue/order_processing_queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    LocationModule,
    RestaurantModule,
    MerchantModule,
    AuthModule,
    ItemModule,
    MenuModule,
    AddonModule,
    CategoryModule,
    OrderModule,
    OrderStatusesModule,
    OrderNotesModule,
    OrderProcessingQueuesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ApplicationExceptionsFilter,
    },
    { provide: TYPES.IApplicationLogger, useClass: ApplicationLogger },
    { provide: TYPES.IContextService, useClass: ContextService },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleWare).exclude().forRoutes(AppController);
  }
}
