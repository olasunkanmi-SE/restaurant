import { Types } from 'mongoose';
import { auditMockData } from '../audit/audit-mock-data';
import { cartItemMock, createItem } from '../cart/cart-item-mock-data';
import { Audit } from '../domain';
import { orderStatusMockData } from '../order_statuses/order-status-mock';
import { OrderStatus } from '../order_statuses/order_status';
import { CreateOrderDTO } from './dto/create-order.dto';
import { IOrder } from './order-entity.interface';

const id = new Types.ObjectId();

export const orderMockData: IOrder = {
  orderStatusId: id,
  state: OrderStatus.create(orderStatusMockData),
  type: 'DINE_IN',
  singleclientId: id,
  customerId: id,
  total: 1,
  audit: Audit.create(auditMockData).getValue(),
  cartItems: [cartItemMock],
  summary: '',
};

export const orderMock: CreateOrderDTO = {
  state: 'CREATED',
  type: 'DINE_IN',
  singleClientId: id.toString(),
  total: 1,
  cartItems: [createItem],
  summary: '',
};
