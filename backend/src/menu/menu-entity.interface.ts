import { IITem } from './../item/item.entity.interface';
export interface IMenu {
  name: string;
  description?: string;
  items?: IITem[];
}
