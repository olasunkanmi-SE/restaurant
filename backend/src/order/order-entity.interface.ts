import { Types } from 'mongoose';

export type currentStatus = 'CREATED' | 'ACCEPTED' | 'DENIED' | 'FINISHED' | 'CANCELLED';
export type dinningType = 'PICK_UP' | 'DINE_IN' | 'DELIVERY';

export enum orderStatus {
  'CREATED',
  'ACCEPTED',
  'DENIED',
  'FINISHED',
  'CANCELLED',
}

export interface IOrder {
  state: currentStatus;
  type: dinningType;
  merchantId: Types.ObjectId;
  customerId?: Types.ObjectId;
  total: number;
  quantity: number;
  discount?: number;
  orderManagerId?: Types.ObjectId;
}
