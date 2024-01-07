import { Restaurant, RestaurantParser } from '../restaurant';
import { AuditParser } from '../audit';
import { CategoryParser } from './../category/category.parser';
import { ITemResponseDTO } from './../item/item-response.dto';
import { ItemParser } from './../item/item.parser';
import { Menu } from './menu';
import { IMenuResponseDTO } from './menu-response.dto';

export class MenuParser {
  static createMenuResponse(menu: Menu, restaurant?: Restaurant): IMenuResponseDTO {
    const { id, name, description, items, audit, discount, imageUrl, basePrice, category, restaurantId } = menu;
    let itemsResponse: ITemResponseDTO[] = [];
    if (items?.length) {
      itemsResponse = ItemParser.createItemsresponse(items);
    }
    return {
      id,
      name,
      description,
      discount,
      imageUrl,
      basePrice,
      restaurantId,
      restaurant: restaurant ? RestaurantParser.createRestaurantResponse(restaurant) : undefined,
      category: category ? CategoryParser.createCategoryResponse(category) : undefined,
      items: itemsResponse,
      ...AuditParser.createAuditResponse(audit),
    };
  }

  static createMenusResponse(menus: Menu[], restaurant?: Restaurant): IMenuResponseDTO[] {
    return menus.map((menu) => this.createMenuResponse(menu, restaurant));
  }
}
