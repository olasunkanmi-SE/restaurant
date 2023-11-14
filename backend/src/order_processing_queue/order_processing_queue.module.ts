import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TYPES } from 'src/application';
import { AuditMapper } from 'src/audit';
import { ContextService } from 'src/infrastructure';

import { OrderProcessingQueueMapper } from './order_processing_queue.mapper';
import {
  OrderProcessingQueueModel,
  OrderProcessingQueueSchema,
} from 'src/infrastructure/data_access/repositories/schemas/order-processing-queue.schema';
import { OrderProcessingQueuesController } from './order_queue_processing.controller';
import { OrderProcessingQueueService } from './order_processing_queue.service';
import { OrderProcessingQueueRepository } from 'src/infrastructure/data_access/repositories/order-processing-queue.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: OrderProcessingQueueModel.name, schema: OrderProcessingQueueSchema }])],
  controllers: [OrderProcessingQueuesController],
  providers: [
    { provide: TYPES.IOrderProcessingQueueService, useClass: OrderProcessingQueueService },
    { provide: TYPES.IOrderProcessingQueueRepository, useClass: OrderProcessingQueueRepository },
    { provide: TYPES.IContextService, useClass: ContextService },
    OrderProcessingQueueMapper,
    AuditMapper,
  ],
})
export class OrderProcessingQueuesModule {}
