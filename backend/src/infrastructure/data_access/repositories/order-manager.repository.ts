import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { GenericDocumentRepository } from '../../../infrastructure/database';
import { OrderManagerMapper } from './../../../order_manager/order-manager.mapper';
import { OrderManager } from './../../../order_manager/order.manager';
import { OrderManagerDataModel, OrderManagerDocument } from './schemas/order-manger.schema';

@Injectable()
export class OrderManagerRepository extends GenericDocumentRepository<OrderManager, OrderManagerDocument> {
  constructor(
    @InjectModel(OrderManagerDataModel.name) orderManagerModel: Model<OrderManagerDocument>,
    @InjectConnection() connection: Connection,
    orderManagerMapper: OrderManagerMapper,
  ) {
    super(orderManagerModel, connection, orderManagerMapper);
  }
}
