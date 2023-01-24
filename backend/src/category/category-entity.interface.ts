import { Audit } from './../domain/audit/audit';
export interface ICategory {
  name: string;
  code: string;
  description?: string;
  audit: Audit;
}
