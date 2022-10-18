import { Audit } from './../domain/audit/audit';
export interface ILocation {
  address: string;
  address2: string;
  city: string;
  country: string;
  postCode: string;
  state: string;
  latitude?: string;
  longitude?: string;
  audit?: Audit;
}
