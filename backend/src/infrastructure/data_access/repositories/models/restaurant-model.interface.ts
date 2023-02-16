import { Types } from 'mongoose';
import { LocationData } from '../schemas';

export interface IRestaurantdata {
  readonly name: string;
  readonly email: string;
  readonly isActive: boolean;
  readonly webUrl?: string;
  readonly logoUrl?: string;
  readonly timeZone?: string;
  readonly phoneNumber: string;
  readonly merchantId: Types.ObjectId;
  readonly location: LocationData;
  readonly opened: boolean;
  readonly imageUrl: string;
}
