import { IAudit } from "./audit.model";
import { IItem } from "./item.model";

export interface IMenu extends IAudit {
  data: {
    id: string;
    name: string;
    description?: string;
    items?: IItem[];
    discount: number;
    imageUrl: string;
    basePrice: number;
  }[];
  isSucess?: boolean;
}
