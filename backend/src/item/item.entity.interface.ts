import { Audit } from './../domain/audit/audit';
export interface IITem {
  name: string;
  description?: string;
  price: number;
  maximumPermitted?: number;
  audit: Audit;
}
