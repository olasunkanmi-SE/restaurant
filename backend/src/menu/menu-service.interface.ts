import { Types } from 'mongoose';
import { Result } from './../domain/result/result';
import { CreateMenuDTO } from './create-menu.schema';
import { IMenuResponseDTO } from './menu-response.dto';

export interface IMenuService {
  createMenu(props: CreateMenuDTO): Promise<Result<IMenuResponseDTO>>;
  getMenus(): Promise<Result<IMenuResponseDTO[]>>;
  getMenuById(id: Types.ObjectId): Promise<Result<IMenuResponseDTO>>;
  updateMenu(props: any, id: Types.ObjectId): Promise<Result<IMenuResponseDTO>>;
  deleteMenu(id: Types.ObjectId): Promise<boolean>;
}
