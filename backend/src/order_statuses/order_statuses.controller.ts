import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderStatusesService } from './order_statuses.service';
import { CreateOrderStatusDto } from './dto/create-order_status.dto';
import { UpdateOrderStatusDto } from './dto/update-order_status.dto';

@Controller('order-statuses')
export class OrderStatusesController {
  constructor(private readonly orderStatusesService: OrderStatusesService) {}

  @Post()
  create(@Body() createOrderStatusDto: CreateOrderStatusDto) {
    return this.orderStatusesService.create(createOrderStatusDto);
  }

  @Get()
  findAll() {
    return this.orderStatusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderStatusesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    return this.orderStatusesService.update(+id, updateOrderStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderStatusesService.remove(+id);
  }
}
