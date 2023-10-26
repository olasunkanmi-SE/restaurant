import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { GenericDocumentRepository } from 'src/infrastructure/database';
import { Order } from 'src/order/order';
import { OrderMapper } from './../../../order/order.mapper';
import { IOrderRepository } from './interfaces/order-repository.interface';
import { OrderDataModel, OrderDocument } from './schemas/order.schema';
import { Result } from 'src/domain';

@Injectable()
export class OrderRepository extends GenericDocumentRepository<Order, OrderDocument> implements IOrderRepository {
  orderMapper: OrderMapper;
  constructor(
    @InjectModel(OrderDataModel.name) orderDataModel: Model<OrderDocument>,
    @InjectConnection() readonly connection: Connection,
    orderMapper: OrderMapper,
  ) {
    super(orderDataModel, connection, orderMapper);
    this.orderMapper = orderMapper;
  }

  async getOrders(): Promise<Order[]> {
    return (await this.find({})).getValue();
  }

  async createOrder(order: OrderDataModel): Promise<Result<Order>> {
    const response = (await this.create(order)).getValue();
    return response ? Result.ok(response) : Result.fail('Could not create order', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
