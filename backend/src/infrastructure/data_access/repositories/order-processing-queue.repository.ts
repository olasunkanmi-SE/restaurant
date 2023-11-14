import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Result } from 'src/domain';
import { GenericDocumentRepository } from 'src/infrastructure/database';
import { throwApplicationError } from 'src/infrastructure/utilities/exception-instance';
import { OrderProcessingQueue } from 'src/order_processing_queue/order_processing_queue';
import { OrderProcessingQueueDocument, OrderProcessingQueueModel } from './schemas/order-processing-queue.schema';
import { IOrderProcessingQueueRespository } from './interfaces/order-processing-queue-repository.interface';
import { OrderProcessingQueueMapper } from 'src/order_processing_queue/order_processing_queue.mapper';

@Injectable()
export class OrderProcessingQueueRepository
  extends GenericDocumentRepository<OrderProcessingQueue, OrderProcessingQueueDocument>
  implements IOrderProcessingQueueRespository
{
  OrderProcessingQueueMapper: OrderProcessingQueueMapper;
  constructor(
    @InjectModel(OrderProcessingQueueModel.name) OrderProcessingQueueDataModel: Model<OrderProcessingQueueDocument>,
    @InjectConnection() readonly connection: Connection,
    OrderProcessingQueueMapper: OrderProcessingQueueMapper,
  ) {
    super(OrderProcessingQueueDataModel, connection, OrderProcessingQueueMapper);
    this.OrderProcessingQueueMapper = OrderProcessingQueueMapper;
  }

  async createOrderProcessingQueue(note: OrderProcessingQueue): Promise<Result<OrderProcessingQueue>> {
    const OrderProcessingQueueToSave = this.OrderProcessingQueueMapper.toPersistence(note);
    const result = (await this.create(OrderProcessingQueueToSave)).getValue();
    if (!result) {
      throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, `Error while creating order note`);
    }
    return Result.ok(result);
  }
}
