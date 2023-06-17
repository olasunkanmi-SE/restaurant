import { IAudit } from "./audit.model";
import { ICategory } from "./category.model";
import { IItem } from "./item.model";

export interface IMenus extends IAudit {
  data: IMenuData[];
  isSucess?: boolean;
}

export interface IMenu extends IAudit {
  data: IMenuData;
  isSucess?: boolean;
}

export interface IMenuData {
  id: string;
  name: string;
  description: string;
  items: IItem[];
  imageUrl: string;
  discount: number;
  basePrice: number;
  category: ICategory;
  cartItemId?: string;
}
