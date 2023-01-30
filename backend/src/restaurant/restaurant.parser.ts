import { MenuParser } from './../menu/menu.parser';
import { MerchantParser } from './../merchant/merchant-parser';
import { AuditParser } from './../audit/audit.parser';
import { LocationParser } from './../location/location.parser';
import { Restaurant } from './restaurant';
import { IRestaurantResponseDTO } from './restaurant-response.dto';
export class RestaurantParser {
  static createRestaurantResponse(restaurant: Restaurant): IRestaurantResponseDTO {
    const { audit, location, merchant, menus } = restaurant;
    const restaurantResponse: IRestaurantResponseDTO = {
      id: restaurant.id,
      name: restaurant.name,
      email: restaurant.email,
      isActive: restaurant.isActive,
      webUrl: restaurant.webUrl,
      logoUrl: restaurant.logoUrl,
      timeZone: restaurant.timeZone,
      menus: MenuParser.createMenusResponse(menus),
      location: LocationParser.createLocationResponse(location),
      ...AuditParser.createAuditResponse(audit),
      merchant: MerchantParser.createMerchantResponse(merchant),
    };
    return restaurantResponse;
  }

  static createRestaurantsParser(restaurants: Restaurant[]): IRestaurantResponseDTO[] {
    return restaurants.length ? restaurants.map((restaurant) => this.createRestaurantResponse(restaurant)) : [];
  }
}
