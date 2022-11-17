import { Result } from './../domain/result/result';
import { CreateLocationDTO } from './create-location.dto';
import { ILocationResponseDTO } from './location-response.dto';
export interface ILocationService {
  createLocation(createLocationDto: CreateLocationDTO): Promise<Result<ILocationResponseDTO>>;
  getAllRestaurantLocations(): Promise<Result<ILocationResponseDTO[]>>;
}
