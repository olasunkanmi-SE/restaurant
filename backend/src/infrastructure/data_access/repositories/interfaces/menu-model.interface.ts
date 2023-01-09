import { ItemDataModel } from './../schemas/item.schema';
export interface IMenuData {
  readonly name: string;
  readonly description?: string;
  readonly items?: ItemDataModel[];
}
