import { IRestaurantResponseDTO } from './restaurant-response.dto';
import { LocationParser } from './../location/location.parser';
import { AuditParser } from './../audit/audit.parser';
import { Restaurant } from './restaurant';
export class RestaurantParser {
  static createRestaurantResponse(
    restaurant: Restaurant,
  ): IRestaurantResponseDTO {
    const { audit, location } = restaurant;
    const restaurantResponse: IRestaurantResponseDTO = {
      name: restaurant.name,
      email: restaurant.email,
      isActive: restaurant.isActive,
      webUrl: restaurant.webUrl,
      logoUrl: restaurant.logoUrl,
      timeZone: restaurant.timeZone,
      location: LocationParser.createLocationResponse(location),
      ...AuditParser.createAuditResponse(audit),
    };
    return restaurantResponse;
  }
}
