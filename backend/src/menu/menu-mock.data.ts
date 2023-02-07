import { auditMockData } from './../audit/audit-mock-data';
import { itemMockData } from './../item/item-mock.data';
import { Item } from './../item/item';
import { IMenu } from './menu-entity.interface';
import { Audit } from '../domain';

export const menuMockData: IMenu = {
  name: '',
  description: '',
  items: [Item.create(itemMockData).getValue()],
  audit: Audit.create(auditMockData).getValue(),
  discount: 0,
  imageUrl: 'http://',
};
