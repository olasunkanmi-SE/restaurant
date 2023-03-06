import { Types } from 'mongoose';
import { Audit } from './../domain/audit/audit';
import { Location } from './../location/location';
import { Menu } from './../menu/menu';
import { Merchant } from './../merchant/merchant';

export type PaymentMethod = 'Cash' | 'Credit';
export enum PaymentBy {
  'Cash',
  'Credit',
}
export interface IRestaurant {
  name: string;
  email: string;
  isActive: boolean;
  phoneNumber: string;
  webUrl?: string;
  logoUrl?: string;
  timeZone?: string;
  opened: boolean;
  imageUrl: string;
  //Todo a restaurant can have multiple locations
  location: Location;
  audit: Audit;
  merchantId: Types.ObjectId;
  merchant: Merchant;
  openingHour: number;
  closingHour: number;
  paymentMethod: PaymentMethod[];
  menus: Menu[];
}
