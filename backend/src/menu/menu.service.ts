import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { IRestaurantRepository } from 'src/infrastructure/data_access/repositories/interfaces';
import { Context } from '../infrastructure/context';
import { Item } from '../item';
import { MenuMapper } from '../menu/menu.mapper';
import { TYPES } from './../application/constants/types';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { IContextService } from './../infrastructure/context/context-service.interface';
import { CategoryRepository } from './../infrastructure/data_access/repositories/category.repository';
import { IItemRepository } from './../infrastructure/data_access/repositories/interfaces/item-repository.interface';
import { MenuRepository } from './../infrastructure/data_access/repositories/menu.repopsitory';
import { throwApplicationError } from './../infrastructure/utilities/exception-instance';
import { IMerchantService } from './../merchant/interface/merchant-service.interface';
import { CreateMenuDTO } from './create-menu.schema';
import { Menu } from './menu';
import { IMenu } from './menu-entity.interface';
import { IMenuResponseDTO } from './menu-response.dto';
import { IMenuService } from './menu-service.interface';
import { MenuParser } from './menu.parser';
import { UpdateMenuDTO } from './update-menu.schema';
@Injectable()
export class MenuService implements IMenuService {
  private context: Context;
  constructor(
    private readonly menuRepository: MenuRepository,
    @Inject(TYPES.IContextService)
    private readonly contextService: IContextService,
    @Inject(TYPES.IMerchantService) private readonly merchantService: IMerchantService,
    @Inject(TYPES.IItemRepository) private readonly itemRepository: IItemRepository,
    @Inject(TYPES.IRestaurantRepository) private readonly restaurantRepository: IRestaurantRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly menuMapper: MenuMapper,
  ) {
    this.context = this.contextService.getContext();
  }

  async createMenu(props: CreateMenuDTO): Promise<Result<IMenuResponseDTO>> {
    await this.merchantService.validateContext();
    const { name, itemIds, categoryId, restaurantId } = props;
    const existingMenu: Result<Menu> = await this.menuRepository.findOne({ name });
    if (existingMenu.isSuccess) {
      throwApplicationError(HttpStatus.BAD_REQUEST, `${name}, already exists`);
    }
    const restaurant = await this.restaurantRepository.getRestaurant(restaurantId);
    if (!restaurant) {
      throwApplicationError(HttpStatus.NOT_FOUND, `restaurant does not exist`);
    }
    const audit: Audit = Audit.createInsertContext(this.context);
    if (itemIds?.length) {
      const result = await this.itemRepository.getItems({ _id: { $in: itemIds } });
      props.items = result.getValue();
    }
    const categoryResponse = await this.categoryRepository.findById(categoryId);
    if (!categoryResponse.isSuccess) {
      throwApplicationError(HttpStatus.NOT_FOUND, `category does not exist`);
    }
    props.category = categoryResponse.getValue();
    const menuProps: IMenu = { ...props, audit };
    const menuEntity = Menu.create(menuProps).getValue();
    const menuModel = this.menuMapper.toPersistence(menuEntity);
    const result: Result<any> = await this.menuRepository.createMenu(menuModel);
    if (!result.isSuccess) {
      throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, 'Menu could not be created');
    }
    const menuId: Types.ObjectId = result.getValue()._id;
    const menu = (await this.menuRepository.getMenuById(menuId)).getValue();
    return Result.ok(MenuParser.createMenuResponse(menu));
  }

  async getMenus(): Promise<Result<IMenuResponseDTO[]>> {
    const menus = (await this.menuRepository.getMenus({})) as Menu[];
    return Result.ok(MenuParser.createMenusResponse(menus));
  }

  async getMenuById(id: Types.ObjectId): Promise<any> {
    const menu = await this.menuRepository.getMenuById(id);
    if (menu.isSuccess === false) {
      throwApplicationError(HttpStatus.NOT_FOUND, 'Menu does not exist');
    }
    return Result.ok(MenuParser.createMenuResponse(menu.getValue()));
  }

  async updateMenu(props: UpdateMenuDTO, id: Types.ObjectId): Promise<Result<IMenuResponseDTO>> {
    const menuIdQuery = { _id: id };
    const result = await this.menuRepository.findById(menuIdQuery);

    if (!result.isSuccess) {
      throwApplicationError(HttpStatus.NOT_FOUND, 'Could not retrieve menu');
    }
    const menu = result.getValue();
    let items: Item[] | [];

    if (props.itemIds) {
      items = await this.itemRepository.getItemsByIds(props.itemIds);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { itemIds, addonIds, ...others } = props;
    const propsWithAuditInfo = {
      ...others,
      items: props.itemIds && menu.items ? [...menu.items, ...items] : items,
      ...Audit.updateContext(this.context.email, menu),
    };

    const updatedMenu = await this.menuRepository.updateMenu(menuIdQuery, propsWithAuditInfo);
    let response: Result<IMenuResponseDTO> | undefined;

    updatedMenu instanceof Menu
      ? (response = Result.ok(MenuParser.createMenuResponse(updatedMenu)))
      : throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, 'Could not update menu');
    return response;
  }

  async deleteMenu(id: Types.ObjectId): Promise<Result<boolean>> {
    const response = await this.menuRepository.deleteMenu(id);
    if (!response) {
      throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, 'Menu could not be deleted');
    }
    return Result.ok(true);
  }

  async getMenuByRestaurantId(restaurantId: string): Promise<Result<IMenuResponseDTO[]>> {
    const result = await this.menuRepository.getMenuByRestaurantId(restaurantId);
    let menus: Menu[] | undefined;
    if (result.getValue()) {
      menus = result.getValue();
    }
    return Result.ok(MenuParser.createMenusResponse(menus));
  }
}
