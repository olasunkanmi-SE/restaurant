import { Audit } from './../domain/audit/audit';
import { Location } from './../location/location';
export interface IRestaurant {
  name: string;
  email: string;
  isActive: boolean;
  webUrl?: string;
  logoUrl?: string;
  timeZone?: string;
  location: Location;
  audit: Audit;
}
