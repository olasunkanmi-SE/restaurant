import { Injectable } from '@nestjs/common';
import { CreateOrderStatusDto } from './dto/create-order_status.dto';
import { UpdateOrderStatusDto } from './dto/update-order_status.dto';

@Injectable()
export class OrderStatusesService {
  create(createOrderStatusDto: CreateOrderStatusDto) {
    return 'This action adds a new orderStatus';
  }

  findAll() {
    return `This action returns all orderStatuses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderStatus`;
  }

  update(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    return `This action updates a #${id} orderStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderStatus`;
  }
}
