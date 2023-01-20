import { AuditParser } from 'src/audit';
import { ITemResponseDTO } from './../item/item-response.dto';
import { ItemParser } from './../item/item.parser';
import { Menu } from './menu';
import { IMenuResponseDTO } from './menu-response.dto';

export class MenuParser {
  createMenuResponse(menu: Menu): IMenuResponseDTO {
    const { id, name, description, items, audit } = menu;
    let itemsResponse: ITemResponseDTO[] = [];
    if (items && items.length) {
      itemsResponse = ItemParser.createItemsresponse(items);
    }
    return {
      id,
      name,
      description,
      items: itemsResponse,
      ...AuditParser.createAuditResponse(audit),
    };
  }

  createMenusResponse(menus: Menu[]): IMenuResponseDTO[] {
    return menus.map((menu) => this.createMenuResponse(menu));
  }
}
