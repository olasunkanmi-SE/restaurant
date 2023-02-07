import { AuditParser } from '../audit';
import { ITemResponseDTO } from './../item/item-response.dto';
import { ItemParser } from './../item/item.parser';
import { Menu } from './menu';
import { IMenuResponseDTO } from './menu-response.dto';

export class MenuParser {
  static createMenuResponse(menu: Menu): IMenuResponseDTO {
    const { id, name, description, items, audit, discount, imageUrl } = menu;
    let itemsResponse: ITemResponseDTO[] = [];
    if (items && items.length) {
      itemsResponse = ItemParser.createItemsresponse(items);
    }
    return {
      id,
      name,
      description,
      discount,
      imageUrl,
      items: itemsResponse,
      ...AuditParser.createAuditResponse(audit),
    };
  }

  static createMenusResponse(menus: Menu[]): IMenuResponseDTO[] {
    return menus.map((menu) => this.createMenuResponse(menu));
  }
}
