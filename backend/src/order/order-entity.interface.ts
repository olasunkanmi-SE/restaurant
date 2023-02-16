import { Merchant } from './../merchant/merchant';

export type currentStatus = 'CREATED' | 'ACCEPTED' | 'DENIED' | 'FINISHED' | 'CANCELLED';
export type dinningType = 'PICK_UP' | 'DINE_IN' | 'DELIVERY';

export interface IOrder {
  state: currentStatus;
  type: dinningType;
  merchant: Merchant;
  customerId?: string;
  total: number;
  discount?: number;
  orderManagerId: string;
  cartId: string;
}
