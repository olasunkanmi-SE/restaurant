import { IAudit } from './../infrastructure/database/mongoDB/base-document.interface';
import { ILocationResponseDTO } from './../location/location-response.dto';
export interface IRestaurantResponseDTO extends IAudit {
  name: string;
  email: string;
  isActive: boolean;
  webUrl?: string;
  logoUrl?: string;
  timeZone?: string;
  location: ILocationResponseDTO;
}
