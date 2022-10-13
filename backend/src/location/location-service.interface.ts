import { CreateLocationDto } from './create-location.dto';
export interface ILocationService {
  createLocation(createLocationDto: CreateLocationDto);
  getAllRestaurantLocations();
}
