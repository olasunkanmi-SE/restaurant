import { Result } from '../../../../domain/result/result';
import { FilterQuery, Types } from 'mongoose';
import { Menu } from '../../../../menu/menu';
import { MenuDataModel } from '../schemas/menu.schema';

export interface IMenuRepository {
  getMenus(filterQuery: FilterQuery<Menu>): Promise<any | any[]>;
  getMenuById(id: Types.ObjectId): Promise<any>;
  createMenu(menuModel: MenuDataModel): Promise<Result<any>>;
  deleteMenu(id: Types.ObjectId);
}
