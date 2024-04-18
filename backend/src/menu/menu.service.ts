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
import { ISingleClientService } from './../singleclient/interface/singleclient-service.interface';
import { CreateMenuDTO } from './create-menu.schema';
import { Menu } from './menu';
import { IMenu } from './menu-entity.interface';
import { IMenuResponseDTO } from './menu-response.dto';
import { IMenuService } from './menu-service.interface';
import { MenuParser } from './menu.parser';
import { UpdateMenuDTO } from './update-menu.schema';
import { Restaurant } from 'src/restaurant';
@Injectable()
export class MenuService implements IMenuService {
  private context: Context;
  constructor(
    private readonly menuRepository: MenuRepository,
    @Inject(TYPES.IContextService)
    private readonly contextService: IContextService,
    @Inject(TYPES.ISingleClientService) private readonly singleclientService: ISingleClientService,
    @Inject(TYPES.IItemRepository) private readonly itemRepository: IItemRepository,
    @Inject(TYPES.IRestaurantRepository) private readonly restaurantRepository: IRestaurantRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly menuMapper: MenuMapper,
  ) {
    this.context = this.contextService.getContext();
  }
  /**
   * Creates a new menu and associates it with a restaurant and category.
   * If items are provided, they are also associated with the menu.
   *
   * @param props - An object containing the properties of the menu to be created
   * @returns A Promise that resolves to a Result object containing an IMenuResponseDTO object
   * @throws {ApplicationError} If the menu name already exists, the restaurant does not exist, or the category does not exist
   */

  async createMenu(props: CreateMenuDTO): Promise<Result<IMenuResponseDTO>> {
    await this.singleclientService.validateContext();
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

  //Refactor
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

  /**
   * Deletes a menu by its ID.
   *
   * @param id - The ID of the menu to delete
   * @returns A Promise that resolves to a Result object containing a boolean indicating whether the menu was deleted successfully
   * @throws {ApplicationError} If the menu could not be deleted
   */
  async deleteMenu(id: Types.ObjectId): Promise<Result<boolean>> {
    const response = await this.menuRepository.deleteMenu(id);
    if (!response) {
      throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, 'Menu could not be deleted');
    }
    return Result.ok(true);
  }

  /**
   * Retrieves the menu of a restaurant by its ID
   *
   * @param restaurantId - The ID of the restaurant to retrieve the menu for
   * @returns A Promise that resolves to a Result object containing an array of IMenuResponseDTO objects
   */
  async getMenuByRestaurantId(restaurantId: string): Promise<Result<IMenuResponseDTO[]>> {
    const result = await this.menuRepository.getMenuByRestaurantId(restaurantId);
    let menus: Menu[] = [];
    if (result.getValue()) {
      menus = result.getValue();
    }
    return Result.ok<IMenuResponseDTO[]>(menus?.length ? MenuParser.createMenusResponse(menus) : []);
  }

  /**
   * Retrieves the extended menu for a restaurant, including the restaurant's details.
   *
   * @param restaurantId - The ID of the restaurant to retrieve the menu for
   * @returns A Promise that resolves to a Result object containing an array of IMenuResponseDTO objects
   */
  async getExtendedMenuByRestaurantId(restaurantId: string): Promise<Result<IMenuResponseDTO[]>> {
    const result = await this.menuRepository.getMenuByRestaurantId(restaurantId);
    if (!result.getValue()) {
      return Result.ok([]);
    }
    const menus = result.getValue()!;
    const id = menus[0].restaurantId;
    const restaurant = await this.restaurantRepository.getRestaurant(id);
    return Result.ok(MenuParser.createMenusResponse(menus, restaurant));
  }
}
