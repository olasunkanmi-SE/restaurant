import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, FilterQuery, Model, Types } from 'mongoose';
import { GenericDocumentRepository } from '../../../infrastructure/database';
import { Result } from './../../../domain/result/result';
import { Menu } from './../../../menu/menu';
import { MenuMapper } from './../../../menu/menu.mapper';
import { MenuDataModel, MenuDocument } from './schemas/menu.schema';

@Injectable()
export class MenuRepository extends GenericDocumentRepository<Menu, MenuDocument> {
  menuMapper: MenuMapper;
  constructor(
    @InjectModel(MenuDataModel.name) menuDataModel: Model<MenuDocument>,
    @InjectConnection() connection: Connection,
    menuMapper: MenuMapper,
  ) {
    super(menuDataModel, connection, menuMapper);
    this.menuMapper = menuMapper;
  }

  async getMenus(filterQuery: FilterQuery<Menu>): Promise<any | any[]> {
    const populateModel = {
      path: 'items',
      populate: {
        path: 'addons',
        populate: {
          path: 'category',
        },
      },
    };
    const documents = await this.DocumentModel.find(filterQuery).populate(populateModel).exec();
    if (!documents) {
      return Result.fail('Error getting Menus from database', HttpStatus.NOT_FOUND);
    }
    return documents.map((menu) => this.menuMapper.toDomain(menu));
  }

  async getMenuById(id: Types.ObjectId): Promise<any> {
    const document = await this.DocumentModel.findById(id).populate('items').exec();
    if (!document) {
      return Result.fail('Error getting menu from database', HttpStatus.NOT_FOUND);
    }
    return this.menuMapper.toDomain(document);
  }
}
