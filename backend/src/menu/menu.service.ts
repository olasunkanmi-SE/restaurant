import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/infrastructure/context';
import { MenuMapper } from 'src/menu/menu.mapper';
import { TYPES } from './../application/constants/types';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { IContextService } from './../infrastructure/context/context-service.interface';
import { ITemRepository } from './../infrastructure/data_access/repositories/item.repository';
import { MenuRepository } from './../infrastructure/data_access/repositories/menu.repopsitory';
import { throwApplicationError } from './../infrastructure/utilities/exception-instance';
import { IMerchantService } from './../merchant/interface/merchant-service.interface';
import { CreateMenuDTO } from './create-menu.schema';
import { Menu } from './menu';
import { IMenu } from './menu-entity.interface';
import { IMenuResponseDTO } from './menu-response.dto';
import { IMenuService } from './menu-service.interface';
import { MenuParser } from './menu.parser';
import { Types } from 'mongoose';
@Injectable()
export class MenuService implements IMenuService {
  private context: Promise<Context>;
  constructor(
    private readonly menuRepository: MenuRepository,
    @Inject(TYPES.IContextService)
    private readonly contextService: IContextService,
    @Inject(TYPES.IMerchantService) private readonly merchantService: IMerchantService,
    private readonly itemRepository: ITemRepository,
    private readonly menuMapper: MenuMapper,
  ) {
    this.context = this.contextService.getContext();
  }

  async createMenu(props: CreateMenuDTO): Promise<Result<IMenuResponseDTO>> {
    const validUser: boolean = await this.merchantService.validateContext();
    if (!validUser) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid Email');
    }
    const { name, itemIds } = props;
    const existingMenu: Result<Menu> = await this.menuRepository.findOne({ name });
    if (existingMenu.isSuccess) {
      throwApplicationError(HttpStatus.BAD_REQUEST, `${name}, already exists`);
    }
    const context: Context = await this.context;
    const audit: Audit = Audit.createInsertContext(context);
    if (itemIds && itemIds.length) {
      const result = await this.itemRepository.find({ _id: { $in: itemIds } });
      props.items = result.getValue();
    }
    const menuProps: IMenu = { ...props, audit };
    const menuEntity = Menu.create(menuProps).getValue();
    const menuModel = this.menuMapper.toPersistence(menuEntity);
    const result: Result<Menu> = await this.menuRepository.create(menuModel);
    if (!result.isSuccess) {
      throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, 'Menu could not be created');
    }
    const menu = result.getValue();
    let response: IMenuResponseDTO | undefined;
    const createdMenu = await this.menuRepository.getMenuById(menu.id);
    if (createdMenu) {
      response = MenuParser.createMenuResponse(createdMenu);
    }
    return Result.ok(response);
  }

  async getMenus(): Promise<Result<IMenuResponseDTO[]>> {
    const menus = await this.menuRepository.getMenus({});
    return Result.ok(MenuParser.createMenusResponse(menus));
  }

  async getMenuById(id: Types.ObjectId): Promise<Result<IMenuResponseDTO>> {
    const menu = await this.menuRepository.getMenuById(id);
    return Result.ok(MenuParser.createMenuResponse(menu));
  }
}
