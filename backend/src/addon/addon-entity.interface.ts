import { Category } from './../category/category';
import { Audit } from './../domain/audit/audit';
export interface IAddon {
  name: string;
  description?: string;
  quantity: number;
  audit: Audit;
  category: Category;
  unitPrice: number;
}
