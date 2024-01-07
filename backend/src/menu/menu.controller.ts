import { Result } from './../domain/result/result';
import { IMenuResponseDTO } from './menu-response.dto';
import { CreateMenuDTO } from './create-menu.schema';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { IMenuService } from './menu-service.interface';
import { TYPES } from '../application';
import { Types } from 'mongoose';
import { UpdateMenuDTO } from './update-menu.schema';

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

  @Patch('/:id')
  async updateMenuById(
    @Body() req: UpdateMenuDTO,
    @Param('id') menuId: Types.ObjectId,
  ): Promise<Result<IMenuResponseDTO>> {
    return this.menuService.updateMenu(req, menuId);
  }

  @Delete('/:id')
  async deleteMenu(@Param('id') menuId: Types.ObjectId): Promise<Result<boolean>> {
    return this.menuService.deleteMenu(menuId);
  }

  //Todo.
  //This API should require both the merchantId and RestaurantId /singleclient/:singleClientId/:restaurantId
  @Get('/singleclient/:restaurantId')
  async getMenusByRestaurantId(@Param('restaurantId') restaurantId: string): Promise<Result<IMenuResponseDTO[]>> {
    return this.menuService.getExtendedMenuByRestaurantId(restaurantId);
  }
}
