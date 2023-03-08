import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, FilterQuery, Model, Types } from 'mongoose';
import { Addon } from '../../../addon';
import { GenericDocumentRepository } from '../../../infrastructure/database';
import { Item } from '../../../item';
import { IMenuRepository } from '../repositories/interfaces/menu-repository.interface';
import { AddonMapper } from './../../../addon/addon.mapper';
import { TYPES } from './../../../application/constants/types';
import { Result } from './../../../domain/result/result';
import { ItemMapper } from './../../../item/item.mapper';
import { Menu } from './../../../menu/menu';
import { MenuMapper } from './../../../menu/menu.mapper';
import { IAddonRepository, IItemRepository } from './interfaces';
import { MenuDataModel, MenuDocument } from './schemas/menu.schema';

@Injectable()
export class MenuRepository extends GenericDocumentRepository<Menu, MenuDocument> implements IMenuRepository {
  menuMapper: MenuMapper;
  constructor(
    @InjectModel(MenuDataModel.name) menuDataModel: Model<MenuDocument>,
    @Inject(TYPES.IItemRepository) private readonly itemRepository: IItemRepository,
    @Inject(TYPES.IAddonRepository) private readonly addonsRepository: IAddonRepository,
    private readonly addonMapper: AddonMapper,
    private readonly itemMapper: ItemMapper,
    @InjectConnection() connection: Connection,
    menuMapper: MenuMapper,
  ) {
    super(menuDataModel, connection, menuMapper);
    this.menuMapper = menuMapper;
  }

  async getMenus(filterQuery: FilterQuery<Menu>): Promise<any | any[]> {
    const documents = await this.DocumentModel.find(filterQuery).populate('category').exec();
    if (!documents) {
      return Result.fail('Error getting Menus from database', HttpStatus.NOT_FOUND);
    }
    const menus = documents.map((doc) => this.menuMapper.toDomain(doc));
    return await this.deleteAndSetItemsAndAddons(menus);
  }

  async deleteAndSetItemsAndAddons(menus: Menu[]): Promise<Menu[]> {
    const itemsMap = new Map<
      Types.ObjectId,
      { items: Types.ObjectId[] | Item[]; addons?: Types.ObjectId[] | Addon[] }
    >();
    menus.forEach((menu) => {
      itemsMap.set(menu.id, { items: menu.items.map((item) => item.id), addons: menu.addons.map((addon) => addon.id) });
    });

    for (const [key, value] of itemsMap) {
      const items = await this.itemRepository.getItemsByIds(value.items as Types.ObjectId[]);
      const addons = await this.addonsRepository.getAddonsByIds(value.addons as Types.ObjectId[]);
      if (items.length !== value.items.length) {
        await this.findOneAndUpdate({ _id: key }, { items: items.map((i) => i.id) });
      }
      if (addons.length !== value.addons.length) {
        await this.findOneAndUpdate({ _id: key }, { addons: addons.map((i) => i.id) });
      }
      const menu = await this.getMenuById(key);
      if (menu) {
        menu.items = items;
        menu.addons = addons;
      }
      if (items && items.length) itemsMap.set(key, { items });
      if (addons && addons.length) itemsMap.set(key, { addons, items });
    }

    menus.forEach((menu) => {
      if (itemsMap.has(menu.id)) {
        menu.items = itemsMap.get(menu.id).items as Item[];
        menu.addons = itemsMap.get(menu.id).addons as Addon[];
      }
    });
    return menus;
  }

  async getMenuById(id: Types.ObjectId): Promise<any> {
    const document = await this.DocumentModel.findById(id)
      .populate('itemDetails')
      .populate('addonDetails')
      .populate('category')
      .exec();
    const menu: Menu = this.menuMapper.toDomain(document);
    if (!document) {
      return Result.fail('Error getting menu from database', HttpStatus.NOT_FOUND);
    }
    const { addons, items } = menu;
    if (addons && addons.length) {
      const addonIds = addons.map((addon) => addon.id);
      const menuAddons = await this.addonsRepository.getAddonsByIds(addonIds);
      if (menuAddons && menuAddons.length) {
        menu.addons = menuAddons;
      }
    }

    if (items && items.length) {
      const itemsIds = items.map((item) => item.id);
      const menuItems = await this.itemRepository.getItemsByIds(itemsIds);
      if (menuItems && menuItems.length) {
        menu.items = menuItems;
      }
    }
    return menu;
  }

  async createMenu(menuModel: MenuDataModel): Promise<Result<any>> {
    const doc = new this.DocumentModel({
      ...menuModel,
      _id: new Types.ObjectId(),
    });
    const result = (await doc.save()).toJSON();
    if (!result) {
      return Result.fail('An Error occured, unable to save document in the db', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return Result.ok(result);
  }

  //use this as a sample to populate nested models
  private populateItems() {
    return {
      path: 'items',
      populate: {
        path: 'addons',
        populate: {
          path: 'category',
        },
      },
    };
  }

  async updateMenu(filter: any, query: any): Promise<Menu | Result<Menu>> {
    const document = await this.DocumentModel.findOneAndUpdate(filter, query);
    if (!document) {
      return Result.fail('Error while updating menu', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const menu = await this.getMenuById(document.id);
    return this.menuMapper.toDomain(menu);
  }
}
