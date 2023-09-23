import { AuditParser } from './../audit/audit.parser';
import { Order } from './order';
import { IOrderResponseDTO } from './order-response.dto';

export class OrderParser {
  static createOrderResponse(order: Order): IOrderResponseDTO {
    const { id, state, type, merchantId, customerId, total, discount, orderManagerId, audit } = order;
    return {
      id,
      state,
      type,
      merchantId,
      customerId,
      total,
      discount,
      orderManagerId,
      ...AuditParser.createAuditResponse(audit),
    };
  }

  static createOrdersResponse(orders: Order[]): IOrderResponseDTO[] {
    return orders.map((order) => this.createOrderResponse(order));
  }
}
