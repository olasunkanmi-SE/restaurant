import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OrderStatusService } from './order_statuses.service';
import { OrderStatusesController } from './order_statuses.controller';
import { TYPES } from 'src/application';
import { OrderStatusRepository } from 'src/infrastructure/data_access/repositories/order-status.repository';
import { ContextService } from 'src/infrastructure';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OrderStatusModel,
  OrderStatusSchema,
} from 'src/infrastructure/data_access/repositories/schemas/order-status.schema';
import { OrderStatusMapper } from './order_status.mapper';
import { AuditMapper } from 'src/audit';
import { ContextMiddleWare } from 'src/infrastructure/middlewares';

@Module({
  imports: [MongooseModule.forFeature([{ name: OrderStatusModel.name, schema: OrderStatusSchema }])],
  controllers: [OrderStatusesController],
  providers: [
    { provide: TYPES.IOrderStatusService, useClass: OrderStatusService },
    { provide: TYPES.IOrderStatusRepository, useClass: OrderStatusRepository },
    { provide: TYPES.IContextService, useClass: ContextService },
    OrderStatusMapper,
    AuditMapper,
  ],
})
export class OrderStatusesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleWare).exclude().forRoutes(OrderStatusesController);
  }
}
