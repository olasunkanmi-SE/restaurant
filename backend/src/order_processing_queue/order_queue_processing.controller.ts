import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { TYPES } from 'src/application';
import { IOrderProcessingQueueService } from './interface/order-processing-queue-service.interface';
import { CreateOrderProcessingQueueDTO } from './dto/create-order_processing_queue.dto';

@Controller('order-processing-queue')
export class OrderProcessingQueuesController {
  constructor(
    @Inject(TYPES.IOrderProcessingQueueService)
    private readonly orderProcessingQueueService: IOrderProcessingQueueService,
  ) {}

  @Post()
  create(@Body() createOrderProcessingQueue: CreateOrderProcessingQueueDTO) {
    return this.orderProcessingQueueService.createOrderProcessingQueue(createOrderProcessingQueue);
  }

  @Get()
  findAll() {
    return this.orderProcessingQueueService.getOrderProcessingQueues();
  }
}
