import { Types } from 'mongoose';
import { auditMockData } from '../../audit/audit-mock-data';
import { Audit } from '../../domain';
import { CreateSelectedItemsDTO } from '../../order/dto/create-order.dto';
import { ISelectedCartItem } from './selected-cart-items-entity.interface';
import { SelectedCartItem } from './selectedCartItem';

const id = new Types.ObjectId();
const selectedItemsMockData: ISelectedCartItem = {
  cartItemId: id,
  itemId: id,
  menuId: id,
  price: 2,
  quantity: 3,
  audit: Audit.create(auditMockData).getValue(),
};

export const selectedItemsMock = SelectedCartItem.create(selectedItemsMockData);

export const createSelectedCartItems: CreateSelectedItemsDTO = {
  cartItemId: id.toString(),
  menuId: id.toString(),
  itemId: id.toString(),
  price: 1,
  quantity: 1,
};
