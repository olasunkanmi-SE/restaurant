import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderStatusDto } from './dto/create-order_status.dto';
import { OrderStatusesService } from './order_statuses.service';

@Controller('order-statuses')
export class OrderStatusesController {
  constructor(private readonly orderStatusesService: OrderStatusesService) {}

  @Post()
  create(@Body() createOrderStatusDto: CreateOrderStatusDto) {
    return this.orderStatusesService.createOrderStatus(createOrderStatusDto);
  }

  @Get()
  findAll() {
    return this.orderStatusesService.getOrderStatuses();
  }
}
