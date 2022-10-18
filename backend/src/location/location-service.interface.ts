import { Result } from './../domain/result/result';
import { CreateLocationDto } from './create-location.dto';
import { ILocationResponseDTO } from './location-response.dto';
export interface ILocationService {
  createLocation(
    createLocationDto: CreateLocationDto,
  ): Promise<Result<ILocationResponseDTO>>;
  getAllRestaurantLocations(): Promise<Result<ILocationResponseDTO[]>>;
}
