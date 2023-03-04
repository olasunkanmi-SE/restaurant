import { auditMockData } from './../audit/audit-mock-data';
import { Audit } from '../domain';
import { IITem } from './item.entity.interface';

export const itemMockData: IITem = {
  name: 'Amala',
  description: '',
  price: 50,
  maximumPermitted: 5,
  audit: Audit.create(auditMockData).getValue(),
};
