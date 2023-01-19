import { Injectable } from '@nestjs/common';
import { GenericDocumentRepository } from 'src/infrastructure/database';
import { Menu } from './../../../menu/menu';
import { MenuDataModel, MenuDocument } from './schemas/menu.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { MenuMapper } from 'src/menu/menu.mapper';

@Injectable()
export class menuRepository extends GenericDocumentRepository<Menu, MenuDocument> {
  constructor(
    @InjectModel(MenuDataModel.name) menuDataModel: Model<MenuDocument>,
    @InjectConnection() connection: Connection,
    menuMapper: MenuMapper,
  ) {
    super(menuDataModel, connection, menuMapper);
  }
}
