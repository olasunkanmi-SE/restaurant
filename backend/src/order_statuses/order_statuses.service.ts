import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TYPES } from 'src/application';
import { Audit, Result } from 'src/domain';
import { Context, IContextService } from 'src/infrastructure';
import { IOrderStatusRespository } from 'src/infrastructure/data_access/repositories/interfaces/order-status.repository';
import { CreateOrderStatusDto } from './dto/create-order_status.dto';
import { IOrderStatusResponseDTO } from './dto/order-status-response';
import { IOrderStatusService } from './interface/order-status-service.interface';
import { OrderStatus } from './order_status';
import { OrderStatusParser } from './order_status_parser';
import { throwApplicationError } from 'src/infrastructure/utilities/exception-instance';

@Injectable()
export class OrderStatusService implements IOrderStatusService {
  private context: Context;
  constructor(
    @Inject(TYPES.IOrderStatusRepository) private readonly orderStatusRepository: IOrderStatusRespository,
    @Inject(TYPES.IContextService)
    private readonly contextService: IContextService,
  ) {
    this.context = this.contextService.getContext();
  }
  async createOrderStatus(props: CreateOrderStatusDto): Promise<Result<IOrderStatusResponseDTO>> {
    const statusExists = await this.getOrderStatus(props.code);
    if (statusExists.isSuccess) {
      throwApplicationError(HttpStatus.BAD_REQUEST, 'order status already exists');
    }
    const audit: Audit = Audit.createInsertContext(this.context);
    const orderStatusEntity = OrderStatus.create({ ...props, audit });
    const result = await this.orderStatusRepository.createOrderStatus(orderStatusEntity);
    const orderStatus = result.getValue();
    const response: IOrderStatusResponseDTO = OrderStatusParser.createResponse(orderStatus);
    return Result.ok(response);
  }

  getOrderStatuses(): Promise<Result<OrderStatus[]>> {
    return this.orderStatusRepository.find({});
  }

  getOrderStatus(prop: string): Promise<Result<OrderStatus>> {
    return this.orderStatusRepository.findOne({ code: prop.toUpperCase() });
  }
}
