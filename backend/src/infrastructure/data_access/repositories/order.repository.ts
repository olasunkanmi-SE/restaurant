import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Result } from 'src/domain';
import { GenericDocumentRepository } from 'src/infrastructure/database';
import { CreateCartItemsDTO } from 'src/order/dto/create-order.dto';
import { Order } from 'src/order/order';
import { OrderMapper } from './../../../order/order.mapper';
import { IOrderRepository } from './interfaces/order-repository.interface';
import { OrderDataModel, OrderDocument } from './schemas/order.schema';

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

  async createOrder(order: OrderDataModel): Promise<Result<Order>> {
    const response = (await this.create(order)).getValue();
    return response ? Result.ok(response) : Result.fail('Could not create order', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async getDuplicateOrder(type: string, merchantId: string, cartItems: CreateCartItemsDTO[]): Promise<boolean> {
    const currentTime: Date = new Date();
    const initDuplicateTimeFrameInMinutes = 60 * 1000;
    const finalDuplicateTimeFrameInMinutes = initDuplicateTimeFrameInMinutes * 4;
    const initDuplicateTimeInMilliSeconds = new Date(currentTime.getMilliseconds() - initDuplicateTimeFrameInMinutes);
    const selectedItems = cartItems.flatMap((item) => item.selectedItems);
    const selectedItemIds = selectedItems.map((item) => item.itemId);
    const result: Result<Order[]> = await this.find({
      type,
      merchantId,
      cartItems: { $elemMatch: { $in: selectedItemIds } },
      auditCreatedDateTime: {
        $gte: initDuplicateTimeInMilliSeconds,
        $lte: new Date(currentTime.getMilliseconds() + finalDuplicateTimeFrameInMinutes),
      },
    });
    const potentialDuplicateOrder = result.getValue();
    return potentialDuplicateOrder.length > 0;
  }

  async getOrders(): Promise<Result<Order[]>> {
    const documents = await this.DocumentModel.find({ _id: '655e104ec80addfb375334ec' })
      .populate('state')
      .populate('cartItems')
      .exec();
    if (documents) {
      const orders: Order[] = documents.map((document) => this.orderMapper.toDomain(document));
      return orders?.length > 0 ? Result.ok(orders) : Result.fail('No orders found', HttpStatus.NOT_FOUND);
    }
  }
}
