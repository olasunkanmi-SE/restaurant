import { Result } from './../domain/result/result';
import { IMenuResponseDTO } from './menu-response.dto';
import { CreateMenuDTO } from './create-menu.schema';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { IMenuService } from './menu-service.interface';
import { TYPES } from '../application';
import { Types } from 'mongoose';

@Controller('menus')
export class MenuController {
  constructor(@Inject(TYPES.IMenuService) private readonly menuService: IMenuService) {}

  @Post()
  async createMenu(@Body() request: CreateMenuDTO): Promise<Result<IMenuResponseDTO>> {
    return await this.menuService.createMenu(request);
  }

  @Get()
  async getMenus(): Promise<Result<IMenuResponseDTO[]>> {
    return await this.menuService.getMenus();
  }

  @Get('/:id')
  async getMenu(@Param('id') menuId: Types.ObjectId): Promise<Result<IMenuResponseDTO>> {
    return this.menuService.getMenuById(menuId);
  }
}
