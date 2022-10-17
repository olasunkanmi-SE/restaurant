import { Audit } from './../domain/audit/audit';
export interface ILocation {
  address: string;
  address2: string;
  city: string;
  country: string;
  postalCode: string;
  state: string;
  latitude?: number;
  longitude?: number;
  audit: Audit;
}
