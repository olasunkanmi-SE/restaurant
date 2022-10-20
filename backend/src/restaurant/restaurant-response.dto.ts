import { Types } from 'mongoose';
import { IAudit } from './../infrastructure/database/mongoDB/base-document.interface';
import { ILocationResponseDTO } from './../location/location-response.dto';
export interface IRestaurantResponseDTO extends IAudit {
  id: Types.ObjectId;
  name: string;
  email: string;
  isActive: boolean;
  webUrl?: string;
  logoUrl?: string;
  timeZone?: string;
  location: ILocationResponseDTO;
}
