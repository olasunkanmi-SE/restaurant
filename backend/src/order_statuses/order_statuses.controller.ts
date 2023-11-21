import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { TYPES } from 'src/application';
import { CreateOrderStatusDto } from './dto/create-order_status.dto';
import { IOrderStatusService } from './interface/order-status-service.interface';

@Controller('orderStatus')
export class OrderStatusesController {
  constructor(@Inject(TYPES.IOrderStatusService) private readonly orderStatusesService: IOrderStatusService) {}

  @Post('create')
  create(@Body() createOrderStatusDto: CreateOrderStatusDto) {
    return this.orderStatusesService.createOrderStatus(createOrderStatusDto);
  }

  @Get()
  findAll() {
    return this.orderStatusesService.getOrderStatuses();
  }
}
