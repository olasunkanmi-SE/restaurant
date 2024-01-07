import { MenuParser } from './../menu/menu.parser';
import { SingleClientParser } from './../singleclient/singleclient-parser';
import { AuditParser } from './../audit/audit.parser';
import { LocationParser } from './../location/location.parser';
import { Restaurant } from './restaurant';
import { IRestaurantResponseDTO } from './restaurant-response.dto';
export class RestaurantParser {
  static createRestaurantResponse(restaurant: Restaurant): IRestaurantResponseDTO {
    const { audit, location, singleclient, menus } = restaurant;
    const auditResponse = audit ? { ...AuditParser.createAuditResponse(audit) } : undefined;
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
      ...auditResponse,
      singleclient: singleclient ? SingleClientParser.createSingleClientResponse(singleclient) : undefined,
    };
    return restaurantResponse;
  }

  static createRestaurantsParser(restaurants: Restaurant[]): IRestaurantResponseDTO[] {
    return restaurants.length ? restaurants.map((restaurant) => this.createRestaurantResponse(restaurant)) : [];
  }
}
