import { Addon } from './../addon/addon';
import { Category } from './../category/category';
import { Audit } from './../domain/audit/audit';
import { Item } from './../item/item';
export interface IMenu {
  name: string;
  description?: string;
  items?: Item[];
  addons: Addon[];
  audit: Audit;
  imageUrl: string;
  discount: number;
  basePrice: number;
  category: Category;
}
