import { AuditParser } from '../audit';
import { CategoryParser } from './../category/category.parser';
import { ITemResponseDTO } from './../item/item-response.dto';
import { ItemParser } from './../item/item.parser';
import { Menu } from './menu';
import { IMenuResponseDTO } from './menu-response.dto';

export class MenuParser {
  static createMenuResponse(menu: Menu): IMenuResponseDTO {
    const { id, name, description, items, audit, discount, imageUrl, basePrice, category } = menu;
    let itemsResponse: ITemResponseDTO[] = [];
    if (items && items.length) {
      itemsResponse = ItemParser.createItemsresponse(items);
    }
    const x = {
      id,
      name,
      description,
      discount,
      imageUrl,
      basePrice,
      category: CategoryParser.createCategoryResponse(category),
      items: itemsResponse,
      ...AuditParser.createAuditResponse(audit),
    };
    return x;
  }

  static createMenusResponse(menus: Menu[]): IMenuResponseDTO[] {
    return menus.map((menu) => this.createMenuResponse(menu));
  }
}
