import { Types } from 'mongoose';
import { Audit } from './../domain/audit/audit';
import { Location } from './../location/location';
import { Menu } from './../menu/menu';
import { SingleClient } from './../singleclient/singleclient';

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
  singleclientId: Types.ObjectId;
  singleclient: SingleClient;
  openingHour: number;
  closingHour: number;
  paymentMethod: PaymentMethod[];
  menus: Menu[];
}
