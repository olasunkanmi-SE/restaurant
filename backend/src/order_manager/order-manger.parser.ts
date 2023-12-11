import { AuditParser } from './../audit/audit.parser';
import { SingleClientParser } from './../singleclient/singleclient-parser';
import { IOrderManagerDTO } from './order-manager-response.dto';
import { OrderManager } from './order.manager';
export class OrderManagerParser {
  static createOrderManagerResponse(orderManager: OrderManager): IOrderManagerDTO {
    const { id, firstName, lastName, email, phoneNumber, singleclient, role, audit } = orderManager;
    return {
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      singleclient: SingleClientParser.createSingleClientResponse(singleclient),
      role,
      ...AuditParser.createAuditResponse(audit),
    };
  }

  static createOrderManagersResponse(orderManagers: OrderManager[]): IOrderManagerDTO[] {
    return orderManagers.map((orderManager) => this.createOrderManagerResponse(orderManager));
  }
}
