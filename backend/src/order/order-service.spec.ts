import mongoose, { Connection } from 'mongoose';
import { IOrderRepository } from 'src/infrastructure/data_access/repositories/interfaces/order-repository.interface';
import * as sinon from 'ts-sinon';
import { expect } from 'chai';
import { IMerchantService } from 'src/merchant';
import { IContextService, MerchantRepository } from 'src/infrastructure';
import { SelectedCartItemRepository } from 'src/infrastructure/data_access/repositories/selected-cart-item.repository';
import { AuditMapper } from 'src/audit';
import { CartItemMapper } from 'src/cart/cart-item.mapper';
import { SelectedCartItemMapper } from 'src/cart/selectedItems/selected-cart-item.mapper';
import { OrderMapper } from './order.mapper';
import { IOrderService } from './interface/order-service.interface';
import { OrderService } from './order.service';
import { ICartItemRepository } from 'src/infrastructure/data_access/repositories/interfaces/cart-item-repository.interface';

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
  const merchantServiceStub: IMerchantService = sinon.stubInterface<IMerchantService>();
  const contextServiceStub: IContextService = sinon.stubInterface<IContextService>();
  const merchantRepositoryStub: MerchantRepository = sinon.stubInterface<MerchantRepository>();
  const selectedCartItemRepositoryStub: SelectedCartItemRepository = sinon.stubInterface<SelectedCartItemRepository>();
  const auditMapperStub = new AuditMapper();
  const selectedCartItemMapperStub = new SelectedCartItemMapper();
  const cartItemMapperStub = new CartItemMapper(auditMapperStub, selectedCartItemMapperStub);
  const cartItemRepositoryStub: ICartItemRepository = sinon.stubInterface<ICartItemRepository>();
  const orderMapperStub = new OrderMapper(auditMapperStub, cartItemMapperStub);
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
  );

  it('Should create an order', () => {
    merchantServiceStub.validateContext = async () => {
      return Promise.resolve(true);
    };
  });
});
