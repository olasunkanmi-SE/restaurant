import { Audit } from '../domain';
import { IOrderStatuses } from './order_status_entity.interface';
import { auditMockData } from '../audit/audit-mock-data';

export const orderStatusMockData: IOrderStatuses = {
  isActive: true,
  name: 'created',
  code: 'CREATED',
  audit: Audit.create(auditMockData).getValue(),
};
