import { Audit } from './../domain/audit/audit';
import { Location } from './../location/location';
import { Merchant } from './../merchant/merchant';
export interface IRestaurant {
  name: string;
  email: string;
  isActive: boolean;
  phoneNumber: string;
  webUrl?: string;
  logoUrl?: string;
  timeZone?: string;
  location: Location;
  audit: Audit;
  merchant: Merchant;
}
