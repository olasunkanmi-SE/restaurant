import { MenuDataModel } from '../schemas/menu.schema';
import { AddonDataModel } from './../../../../addon/addon.schema';

export interface IMenuAddonModel {
  menu: MenuDataModel;
  addon: AddonDataModel;
}
