import { Audit } from './../domain/audit/audit';
export interface IAddon {
  category: string;
  code: string;
  description?: string;
  audit: Audit;
}
