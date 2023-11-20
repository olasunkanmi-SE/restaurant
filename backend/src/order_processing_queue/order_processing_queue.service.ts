import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TYPES } from 'src/application';
import { Audit, Result } from 'src/domain';
import { Context, IContextService } from 'src/infrastructure';
import { IOrderProcessingQueueRespository } from 'src/infrastructure/data_access/repositories/interfaces/order-processing-queue-repository.interface';
import { CreateOrderProcessingQueueDTO } from './dto/create-order_processing_queue.dto';
import { IOrderProcessingQueueService } from './interface/order-processing-queue-service.interface';
import { OrderProcessingQueue } from './order_processing_queue';
import { throwApplicationError } from 'src/infrastructure/utilities/exception-instance';

@Injectable()
export class OrderProcessingQueueService implements IOrderProcessingQueueService {
  private context: Context;
  constructor(
    @Inject(TYPES.IOrderProcessingQueueRepository)
    private readonly orderProcessingQueueRepository: IOrderProcessingQueueRespository,
    @Inject(TYPES.IContextService)
    private readonly contextService: IContextService,
  ) {
    this.context = this.contextService.getContext();
  }
  async createOrderProcessingQueue(props: CreateOrderProcessingQueueDTO): Promise<OrderProcessingQueue> {
    const audit: Audit = Audit.createInsertContext(this.context);
    const orderProcessingQueueEntity = OrderProcessingQueue.create({ ...props, audit });
    const result = await this.orderProcessingQueueRepository.createOrderProcessingQueue(orderProcessingQueueEntity);
    if (!result) {
      throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, `Could not create order status queue`);
    }
    return result.getValue();
  }

  async createOrderProcessingQueues(props: CreateOrderProcessingQueueDTO[]): Promise<OrderProcessingQueue[]> {
    const statusQueues = props.map((queue) => this.createOrderProcessingQueue(queue));
    const result = await Promise.all(statusQueues);
    if (!result) {
      throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, `Could not create order status queue`);
    }
    return result;
  }

  getOrderProcessingQueues(): Promise<Result<OrderProcessingQueue[]>> {
    return this.orderProcessingQueueRepository.find({});
  }
}
