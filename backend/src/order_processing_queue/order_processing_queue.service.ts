import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from 'src/application';
import { Audit, Result } from 'src/domain';
import { Context, IContextService } from 'src/infrastructure';
import { CreateOrderProcessingQueueDTO } from './dto/create-order_processing_queue.dto';
import { IOrderProcessingQueueResponseDTO } from './dto/order-processing-queue.reponse';
import { IOrderProcessingQueueService } from './interface/order-processing-queue-service.interface';
import { OrderProcessingQueue } from './order_processing_queue';
import { IOrderProcessingQueueRespository } from 'src/infrastructure/data_access/repositories/interfaces/order-processing-queue-repository.interface';
import { OrderProcessingQueuewParser } from './order_processing_queue_parser';

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
  async createOrderProcessingQueue(
    props: CreateOrderProcessingQueueDTO,
  ): Promise<Result<IOrderProcessingQueueResponseDTO>> {
    const audit: Audit = Audit.createInsertContext(this.context);
    const orderProcessingQueueEntity = OrderProcessingQueue.create({ ...props, audit });
    const result = await this.orderProcessingQueueRepository.createOrderProcessingQueue(orderProcessingQueueEntity);
    const orderProcessingQueue = result.getValue();
    const response: IOrderProcessingQueueResponseDTO = OrderProcessingQueuewParser.createResponse(orderProcessingQueue);
    return Result.ok(response);
  }

  getOrderProcessingQueues(): Promise<Result<OrderProcessingQueue[]>> {
    return this.orderProcessingQueueRepository.find({});
  }
}
