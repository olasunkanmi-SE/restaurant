import { Module } from '@nestjs/common';
import { OrderStatusesService } from './order_statuses.service';
import { OrderStatusesController } from './order_statuses.controller';

@Module({
  controllers: [OrderStatusesController],
  providers: [OrderStatusesService]
})
export class OrderStatusesModule {}
