import { AuditParser } from 'src/audit/audit.parser';
import { Location } from './location';
import { ILocationResponseDTO } from './location-response.dto';

export class LocationParser {
  static createLocationResponse(location: Location): ILocationResponseDTO {
    const locationResponse: ILocationResponseDTO = {
      address: location.address,
      address2: location.address2,
      city: location.city,
      country: location.country,
      postCode: location.postCode,
      state: location.state,
      latitude: location.latitude,
      longitude: location.longitude,
      ...AuditParser.createAuditResponse(location.audit),
    };
    return locationResponse;
  }

  static createLocationsResponse(
    locations: Location[],
  ): ILocationResponseDTO[] {
    const locationsResponse: ILocationResponseDTO[] = [];
    for (const location of locations) {
      locationsResponse.push(this.createLocationResponse(location));
    }
    return locationsResponse;
  }
}
