import { CartItemMapper } from './../cart/cart-item.mapper';
import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/domain';
import { OrderDataModel } from 'src/infrastructure/data_access/repositories/schemas/order.schema';
import { Order } from './order';
import { AuditMapper } from 'src/audit';

@Injectable()
export class OrderMapper implements IMapper<Order, OrderDataModel> {
  constructor(private readonly auditMapper: AuditMapper, private readonly cartItemMapper: CartItemMapper) {}
  toPersistence(entity: Order): OrderDataModel {
    const { id, state, type, merchantId, total, quantity, discount, orderManagerId, audit, cartItems } = entity;
    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    } = audit;
    const orderDocument: OrderDataModel = {
      _id: id,
      state,
      type,
      merchantId,
      total,
      quantity,
      discount,
      cartItems: cartItems.map((cartItem) => this.cartItemMapper.toPersistence(cartItem)),
      orderManagerId,
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedDateTime,
      auditDeletedBy,
    };
    return orderDocument;
  }

  toDomain(model: OrderDataModel): Order {
    const { state, type, merchantId, total, quantity, discount, orderManagerId, _id, cartItems } = model;
    const entity: Order = Order.create(
      {
        state,
        type,
        merchantId,
        total,
        quantity,
        discount,
        orderManagerId,
        audit: this.auditMapper.toDomain(model),
        cartItems: cartItems.map((cartItem) => this.cartItemMapper.toDomain(cartItem)),
      },
      _id,
    ).getValue();
    return entity;
  }
}
