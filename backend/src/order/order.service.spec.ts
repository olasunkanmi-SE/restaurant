import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import mongoose, { ClientSession, Connection, Types } from 'mongoose';
import * as sinon from 'ts-sinon';
import { auditMockData } from '../audit/audit-mock-data';
import { CartItemMapper } from '../cart/cart-item.mapper';
import { SelectedCartItemMapper } from '../cart/selectedItems/selected-cart-item.mapper';
import { Audit, Result } from '../domain';
import { IContextService, MerchantRepository } from '../infrastructure';
import { ICartItemRepository } from '../infrastructure/data_access/repositories/interfaces/cart-item-repository.interface';
import { IOrderRepository } from '../infrastructure/data_access/repositories/interfaces/order-repository.interface';
import { IOrderStatusRespository } from '../infrastructure/data_access/repositories/interfaces/order-status.repository';
import { SelectedCartItemRepository } from '../infrastructure/data_access/repositories/selected-cart-item.repository';
import { IMerchantService, Merchant, merchant } from '../merchant';
import { IOrderNoteService } from '../order_notes/interface/order-note-service.interface';
import { IOrderProcessingQueueService } from '../order_processing_queue/interface/order-processing-queue-service.interface';
import { OrderStatus } from '../order_statuses/order_status';
import { OrderStatusMapper } from '../order_statuses/order_status.mapper';
import { AuditMapper } from './../audit/audit.mapper';
import { IOrderService } from './interface/order-service.interface';
import { orderMock } from './order-mock-data';
import { OrderMapper } from './order.mapper';
import { OrderService } from './order.service';

interface IClientSession {
  endSession(): boolean;
  abortTransaction(): boolean;
  startSession(): boolean;
  startTransaction(): boolean;
}
class ClientSessionStub implements IClientSession {
  constructor(private readonly sessionId: string) {}
  endSession(): boolean {
    return true;
  }

  abortTransaction(): boolean {
    return true;
  }

  startSession(): boolean {
    return true;
  }

  startTransaction(): boolean {
    this.id;
    return true;
  }

  get id(): string {
    return this.sessionId;
  }
}
describe('Order Service', () => {
  let connection: ClientSessionStub = new ClientSessionStub('1');
  beforeEach(() => {
    connection.startSession();
    connection.startTransaction();
  });
  afterEach(async () => {
    connection.id;
    connection.abortTransaction();
    connection.endSession();
  });

  const orderRepositoryStub: IOrderRepository = sinon.stubInterface<IOrderRepository>();
  const merchantServiceStub: IMerchantService = sinon.stubInterface<IMerchantService>();
  const contextServiceStub: IContextService = sinon.stubInterface<IContextService>();
  const merchantRepositoryStub: MerchantRepository = sinon.stubInterface<MerchantRepository>();
  const selectedCartItemRepositoryStub: SelectedCartItemRepository = sinon.stubInterface<SelectedCartItemRepository>();
  const auditMapperStub = new AuditMapper();
  const selectedCartItemMapperStub = new SelectedCartItemMapper();
  const cartItemMapperStub = new CartItemMapper(auditMapperStub, selectedCartItemMapperStub);
  const cartItemRepositoryStub: ICartItemRepository = sinon.stubInterface<ICartItemRepository>();
  const orderStatusMapperStub = new OrderStatusMapper(auditMapperStub);
  const orderMapperStub = new OrderMapper(auditMapperStub, cartItemMapperStub, orderStatusMapperStub);
  const orderStatusRepositoryStub: IOrderStatusRespository = sinon.stubInterface<IOrderStatusRespository>();
  const orderNoteServiceStub: IOrderNoteService = sinon.stubInterface<IOrderNoteService>();
  const orderProcessingQueueServiceStub: IOrderProcessingQueueService =
    sinon.stubInterface<IOrderProcessingQueueService>();
  const orderService: IOrderService = new OrderService(
    orderRepositoryStub,
    merchantServiceStub,
    contextServiceStub,
    merchantRepositoryStub,
    selectedCartItemRepositoryStub,
    orderMapperStub,
    selectedCartItemMapperStub,
    cartItemMapperStub,
    cartItemRepositoryStub,
    orderStatusRepositoryStub,
    orderNoteServiceStub,
    orderProcessingQueueServiceStub,
  );

  it('Should not create an order, It should throw a duplicate order warning', async () => {
    try {
      merchantServiceStub.validateContext = async () => {
        return true;
      };
      orderRepositoryStub.getDuplicateOrder = async () => {
        return true;
      };
      await orderService.createOrder(orderMock);
    } catch (error: any) {
      expect(error.response.status).to.equal(404);
      expect(error.response.error).to.equal('Duplicate order detected. Please confirm.');
    }
  });

  it('Should not create an order, If merchant does not exist', async () => {
    try {
      merchantServiceStub.validateContext = async () => {
        return true;
      };
      orderRepositoryStub.getDuplicateOrder = async () => {
        return false;
      };

      merchantRepositoryStub.findOne = async (): Promise<Result<Merchant>> => {
        return Result.fail('Error getting documents from database', HttpStatus.NOT_FOUND);
      };
      await orderService.createOrder(orderMock);
    } catch (error: any) {
      expect(error.response.status).to.equal(404);
      expect(error.response.error).to.equal('Merchant does not exist');
    }
  });

  it('Should not create an order, If wrong order status is passed in', async () => {
    try {
      merchantServiceStub.validateContext = async () => {
        return true;
      };
      orderRepositoryStub.getDuplicateOrder = async () => {
        return false;
      };

      merchantRepositoryStub.findOne = async (): Promise<Result<Merchant>> => {
        return Result.ok(merchant);
      };
      Audit.createInsertContext = (): Audit => {
        return Audit.create(auditMockData).getValue();
      };
      orderRepositoryStub.stringToObjectId = (): Types.ObjectId => {
        return new Types.ObjectId();
      };
      orderStatusRepositoryStub.findOne = async (): Promise<Result<OrderStatus>> => {
        return Result.fail('Error getting orderstatus from database', HttpStatus.NOT_FOUND);
      };
      await orderService.createOrder(orderMock);
    } catch (error: any) {
      expect(error).to.not.be.undefined;
    }
  });
});
