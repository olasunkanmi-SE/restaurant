import { Audit } from 'src/domain';

export interface IOrderStatuses {
  isActive: boolean;
  name: string;
  code: string;
  description?: string;
  audit: Audit;
}
