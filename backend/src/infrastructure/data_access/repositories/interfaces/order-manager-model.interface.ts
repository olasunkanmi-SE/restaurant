import { Role } from 'src/order_manager/order.manager.entity';
import { Merchant } from './../../../../merchant/merchant';

export interface IOrderManagerDataModel {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phoneNumber?: string;
  readonly merchant: Merchant;
  readonly role: Role;
}
