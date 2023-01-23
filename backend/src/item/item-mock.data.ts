import { auditMockData } from './../audit/audit-mock-data';
import { Audit } from '../domain';
import { IITem } from './item.entity.interface';

export const itemMockData: IITem = {
  name: 'Amala',
  description: '',
  portion: 'sharing',
  price: 50,
  quantity: 5,
  image: '',
  tags: [''],
  maximumPermitted: 5,
  taxRate: 0.25,
  addons: [],
  audit: Audit.create(auditMockData).getValue(),
};
