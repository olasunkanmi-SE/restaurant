import { auditMockData } from 'src/audit/audit-mock-data';
import { Audit } from '../domain';
import { IAddon } from './addon-entity.interface';
import { Category, categoryMockData } from '../category';

export const addonMockData: IAddon = {
  name: 'rice',
  quantity: 6,
  audit: Audit.create(auditMockData).getValue(),
  category: Category.create(categoryMockData).getValue(),
  unitPrice: 5,
};
