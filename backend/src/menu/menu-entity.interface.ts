import { Category } from './../category/category';
import { Audit } from './../domain/audit/audit';
import { Item } from './../item/item';
export interface IMenu {
  name: string;
  description?: string;
  items?: Item[];
  audit: Audit;
  imageUrl: string;
  discount: number;
  basePrice: number;
  category: Category;
}
