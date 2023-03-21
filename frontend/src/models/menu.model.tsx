import { IAudit } from "./audit.model";
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
  items?: IItem[];
  discount: number;
  imageUrl: string;
  basePrice: number;
}
