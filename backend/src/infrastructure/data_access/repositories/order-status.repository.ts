import { HttpStatus, Injectable } from '@nestjs/common';
import { OrderStatusDocument, OrderStatusModel } from './schemas/order-status.schema';
import { OrderStatus } from 'src/order_statuses/order_status';
import { GenericDocumentRepository } from 'src/infrastructure/database';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { OrderStatusMapper } from 'src/order_statuses/order_status.mapper';
import { Result } from 'src/domain';
import { IOrderStatusRespository } from './interfaces/order-status.repository';
import { throwApplicationError } from 'src/infrastructure/utilities/exception-instance';

@Injectable()
export class OrderStatusRepository
  extends GenericDocumentRepository<OrderStatus, OrderStatusDocument>
  implements IOrderStatusRespository
{
  orderStatusMapper: OrderStatusMapper;
  constructor(
    @InjectModel(OrderStatusModel.name) orderStatusDataModel: Model<OrderStatusDocument>,
    @InjectConnection() readonly connection: Connection,
    orderStatusMapper: OrderStatusMapper,
  ) {
    super(orderStatusDataModel, connection, orderStatusMapper);
    this.orderStatusMapper = orderStatusMapper;
  }

  async createOrderStatus(status: OrderStatus): Promise<Result<OrderStatus>> {
    const orderStatusToSave = this.orderStatusMapper.toPersistence(status);
    const result = (await this.create(orderStatusToSave)).getValue();
    if (!result) {
      throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, `Error while creating order status`);
    }
    return Result.ok(result);
  }
}
