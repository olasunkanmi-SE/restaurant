import { IAudit } from "./audit.model";
import { ICategory } from "./category.model";

export interface IAddon extends IAudit {
  id: string;
  name: string;
  quantity: number;
  category: ICategory;
  description: string | undefined;
}
