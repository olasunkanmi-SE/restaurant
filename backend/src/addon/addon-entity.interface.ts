import { Audit } from './../domain/audit/audit';
export interface IAddon {
  name: string;
  description?: string;
  quantity: number;
  audit: Audit;
}
