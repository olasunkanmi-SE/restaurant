import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { GenericDocumentRepository } from 'src/infrastructure/database';
import { Order } from 'src/order/order';
import { OrderMapper } from './../../../order/order.mapper';
import { OrderDataModel, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrderRepository extends GenericDocumentRepository<Order, OrderDocument> {
  orderMapper: OrderMapper;
  orderDataModel: Model<OrderDocument>;
  constructor(
    @InjectModel(OrderDataModel.name) orderDataModel: Model<OrderDocument>,
    @InjectConnection() readonly connection: Connection,
    orderMapper: OrderMapper,
  ) {
    super(orderDataModel, connection, orderMapper);
    this.orderMapper = orderMapper;
    this.orderDataModel = orderDataModel;
  }

  async getOrders(): Promise<Order[]> {
    const documents = await this.orderDataModel.find({});
    return documents.length ? documents.map((doc) => this.orderMapper.toDomain(doc)) : [];
  }

  async createOrder(order: OrderDataModel): Promise<any> {
    const doc = new this.DocumentModel({
      ...order,
      _id: new Types.ObjectId(),
    });
    const result = (await doc.save()).toJSON();
    return result;
  }
}
