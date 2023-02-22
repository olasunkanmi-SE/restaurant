import { AuthService } from './../infrastructure/auth/auth.service';
import { Result } from './../domain/result/result';
import { OrderManagerMapper } from './order-manager.mapper';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { saltRounds } from './../application/constants/constants';
import { TYPES } from './../application/constants/types';
import { Audit } from './../domain/audit/audit';
import { Context } from './../infrastructure/context/context';
import { IContextService } from './../infrastructure/context/context-service.interface';
import { MerchantRepository } from './../infrastructure/data_access/repositories/merchant.repository';
import { OrderManagerRepository } from './../infrastructure/data_access/repositories/order-manager.repository';
import { OrderManagerDocument } from './../infrastructure/data_access/repositories/schemas/order-manger.schema';
import { throwApplicationError } from './../infrastructure/utilities/exception-instance';
import { Merchant } from './../merchant/merchant';
import { IValidateUser } from './../utils/context-validation.interface';
import { CreateOrderManager } from './create-order-manager.schema.dto';
import { OrderManager } from './order.manager';
import { OrderManagerParser } from './order-manger.parser';
import { IOrderManagerDTO } from './order-manager-response.dto';
import { Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class OrderManagerService extends AuthService {
  private context: Context;
  constructor(
    jwtService: JwtService,
    configService: ConfigService,
    private readonly contextService: IContextService,
    private readonly orderManagerRepository: OrderManagerRepository,
    @Inject(TYPES.IValidateUser)
    private readonly validateOrderManager: IValidateUser<OrderManager, OrderManagerDocument>,
    private readonly merchantRepository: MerchantRepository,
    private readonly mapper: OrderManagerMapper,
  ) {
    super(jwtService, configService);
    this.context = this.contextService.getContext();
  }

  async createOrderManager(props: CreateOrderManager): Promise<IOrderManagerDTO> {
    await this.validateUser();
    const { password, email } = props;
    const existingOrderManager = await this.orderManagerRepository.findOne({ email });
    if (existingOrderManager.isSuccess) {
      throwApplicationError(HttpStatus.BAD_REQUEST, 'Order Manager already exists');
    }
    const validateMerchant = await this.merchantRepository.findById({ id: props.merchantId });
    let merchant: Merchant | undefined;
    if (validateMerchant.isSuccess) {
      merchant = validateMerchant.getValue();
    }

    const hashedPassword = await this.hashData(password, saltRounds);
    const audit = Audit.createInsertContext(this.context);
    const orderManagerEntity: OrderManager = OrderManager.create({
      ...props,
      merchant,
      password: hashedPassword,
      audit,
    }).getValue();
    const orderMangerModel = this.mapper.toPersistence(orderManagerEntity);
    const orderManager = await this.orderManagerRepository.create(orderMangerModel);
    if (!orderManager.isSuccess) {
      throwApplicationError(500, 'Order Manage could not be created, try again later');
    }
    const response = OrderManagerParser.createOrderManagerResponse(orderManager.getValue());
    return response;
  }

  async validateUser(): Promise<boolean> {
    return await this.validateOrderManager.getUser(this.orderManagerRepository, { email: this.context.email });
  }

  async getOrderManagers(): Promise<IOrderManagerDTO[] | []> {
    const result: Result<OrderManager[]> = await this.orderManagerRepository.find({});
    const orderManagers = result.getValue();
    let response: IOrderManagerDTO[] | [];
    if (orderManagers.length) {
      response = OrderManagerParser.createOrderManagersResponse(orderManagers);
    }
    return response;
  }

  async getOrderManager(id: Types.ObjectId): Promise<IOrderManagerDTO> {
    const result: Result<OrderManager> = await this.orderManagerRepository.findById(id);
    if (!result.isSuccess) {
      throwApplicationError(400, 'Order Manager does not exist');
    }
    const orderManager = result.getValue();
    return OrderManagerParser.createOrderManagerResponse(orderManager);
  }
}
