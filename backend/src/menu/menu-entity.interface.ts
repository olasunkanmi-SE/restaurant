import { Audit } from './../domain/audit/audit';
import { Item } from './../item/item';
export interface IMenu {
  name: string;
  description?: string;
  items?: Item[];
  audit: Audit;
  discount: number;
}
