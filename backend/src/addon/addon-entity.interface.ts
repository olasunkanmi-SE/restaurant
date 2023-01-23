import { Audit } from './../domain/audit/audit';
export interface IAddon {
  name: string;
  code: string;
  description?: string;
  quantity: number;
  audit: Audit;
}
