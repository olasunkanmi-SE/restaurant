import { Result } from './../domain/result/result';
import { CreateMenuDTO } from './create-menu.schema';
import { IMenuResponseDTO } from './menu-response.dto';

export interface IMenuService {
  createMenu(props: CreateMenuDTO): Promise<Result<IMenuResponseDTO>>;
}
