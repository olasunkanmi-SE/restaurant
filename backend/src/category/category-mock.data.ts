import { Audit } from '../domain';
import { auditMockData } from './../audit/audit-mock-data';
import { ICategory } from './category-entity.interface';

export const categoryMockData: ICategory = {
  name: 'Breakfast',
  code: 'BREAKFAST',
  description: '',
  audit: Audit.create(auditMockData).getValue(),
};
