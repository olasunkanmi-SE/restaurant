import { AuditParser } from './../audit/audit.parser';
import { IOrderStatusResponseDTO } from './dto/order-status-response';
import { OrderStatus } from './order_status';

export class OrderStatusParser {
  static createResponse({ id, name, isActive, description, code, audit }: OrderStatus): IOrderStatusResponseDTO {
    return { id, name, code, description, isActive, ...AuditParser.createAuditResponse(audit) };
  }

  static createOrderStatusResponses(orderStatus: OrderStatus[]) {
    return orderStatus.map((status) => {
      this.createResponse(status);
    });
  }
}
