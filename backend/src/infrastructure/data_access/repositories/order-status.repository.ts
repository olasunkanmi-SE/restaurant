import { Injectable } from '@nestjs/common';
import { OrderStatusDocument, OrderStatusModel } from './schemas/order-status.schema';
import { OrderStatus } from 'src/order_statuses/order_status';
import { GenericDocumentRepository } from 'src/infrastructure/database';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { orderStatusMapper } from 'src/order_statuses/order_status.mapper';

@Injectable()
export class OrderStatusRepository extends GenericDocumentRepository<OrderStatus, OrderStatusDocument> {
  orderStatusMapper: orderStatusMapper;
  constructor(
    @InjectModel(OrderStatusModel.name) orderStatusDataModel: Model<OrderStatusDocument>,
    @InjectConnection() readonly connection: Connection,
    orderStatusMapper: orderStatusMapper,
  ) {
    super(orderStatusDataModel, connection, orderStatusMapper);
    this.orderStatusMapper = orderStatusMapper;
  }
}
