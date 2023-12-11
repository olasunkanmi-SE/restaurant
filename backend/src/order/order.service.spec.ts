import { expect } from 'chai';
import mongoose, { Connection } from 'mongoose';
import * as sinon from 'ts-sinon';
import { CartItemMapper } from '../cart/cart-item.mapper';
import { SelectedCartItemMapper } from '../cart/selectedItems/selected-cart-item.mapper';
import { IContextService, SingleClientRepository } from '../infrastructure';
import { ICartItemRepository } from '../infrastructure/data_access/repositories/interfaces/cart-item-repository.interface';
import { IOrderRepository } from '../infrastructure/data_access/repositories/interfaces/order-repository.interface';
import { IOrderStatusRespository } from '../infrastructure/data_access/repositories/interfaces/order-status.repository';
import { SelectedCartItemRepository } from '../infrastructure/data_access/repositories/selected-cart-item.repository';
import { ISingleClientService } from '../singleclient';
import { IOrderNoteService } from '../order_notes/interface/order-note-service.interface';
import { IOrderProcessingQueueService } from '../order_processing_queue/interface/order-processing-queue-service.interface';
import { OrderStatusMapper } from '../order_statuses/order_status.mapper';
import { AuditMapper } from './../audit/audit.mapper';
import { IOrderService } from './interface/order-service.interface';
import { orderMock } from './order-mock-data';
import { OrderMapper } from './order.mapper';
import { OrderService } from './order.service';

describe('Order Service', () => {
  let connection: Connection;
  beforeEach(async () => {
    connection = new Connection();
  });
  afterEach(async () => {
    connection.close();
    mongoose.disconnect();
  });

  const orderRepositoryStub: IOrderRepository = sinon.stubInterface<IOrderRepository>();
  const singleclientServiceStub: ISingleClientService = sinon.stubInterface<ISingleClientService>();
  const contextServiceStub: IContextService = sinon.stubInterface<IContextService>();
  const singleclientRepositoryStub: SingleClientRepository = sinon.stubInterface<SingleClientRepository>();
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
    singleclientServiceStub,
    contextServiceStub,
    singleclientRepositoryStub,
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
      singleclientServiceStub.validateContext = async () => {
        return Promise.resolve(true);
      };
      orderRepositoryStub.getDuplicateOrder = async () => {
        return Promise.resolve(true);
      };
      await orderService.createOrder(orderMock);
    } catch (error: any) {
      expect(error.response.status).to.equal(404);
      expect(error.response.error).to.equal('Duplicate order detected. Please confirm.');
    }
  });
});
