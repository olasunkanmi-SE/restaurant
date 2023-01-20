import { Result } from './../domain/result/result';
import { IMenuResponseDTO } from './menu-response.dto';
import { CreateMenuDTO } from './create-menu.schema';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IMenuService } from './menu-service.interface';
import { TYPES } from 'src/application';

@Controller('menus')
export class MenuController {
  constructor(@Inject(TYPES.IMenuService) private readonly menuService: IMenuService) {}

  @Post()
  createMenu(@Body() request: CreateMenuDTO): Promise<Result<IMenuResponseDTO>> {
    return this.menuService.createMenu(request);
  }
}
