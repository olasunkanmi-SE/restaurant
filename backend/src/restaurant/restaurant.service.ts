import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { RestaurantRepository } from './../infrastructure/data_access/repositories/restaurant.repository';
import { RestaurantDocument } from './../infrastructure/data_access/repositories/schemas/restaurant.schema';
import { Location } from './../location/location';
import { CreateRestaurantDTO } from './create-restaurant.dto';
import { Restaurant } from './restaurant';
import { IRestaurantResponseDTO } from './restaurant-response.dto';
import { IRestaurantService } from './restaurant-service.interface';
import { RestaurantMapper } from './restaurant.mapper';
import { RestaurantParser } from './restaurant.parser';
@Injectable()
export class RestaurantService implements IRestaurantService {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly restaurantMapper: RestaurantMapper,
  ) {}

  async createRestaurant(
    createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<Result<IRestaurantResponseDTO>> {
    const restaurantDocuments: RestaurantDocument[] =
      await this.restaurantRepository.find({});

    const existingEmail = restaurantDocuments.find(
      (doc) => doc.email === createRestaurantDTO.email,
    );

    if (existingEmail) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Restaurant with email ${createRestaurantDTO.email} already exists`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const audit: Audit = Audit.createInsertContext();
    const location: Location = Location.create({
      ...createRestaurantDTO.location,
      audit,
    }).getValue();

    const restaurant: Restaurant = Restaurant.create({
      ...createRestaurantDTO,
      location,
      audit,
    }).getValue();

    const newRestaurant = await this.restaurantRepository.create(
      this.restaurantMapper.toPersistence(restaurant),
    );

    return Result.ok(
      RestaurantParser.createRestaurantResponse(
        this.restaurantMapper.toDomain(newRestaurant),
      ),
    );
  }

  async getRestaurants(): Promise<Result<IRestaurantResponseDTO[]>> {
    const restaurants: Restaurant[] = [];
    const documents = await this.restaurantRepository.find({});
    if (documents.length) {
      for (const document of documents) {
        restaurants.push(this.restaurantMapper.toDomain(document));
      }
    }
    return Result.ok(
      RestaurantParser.createRestaurantsParser(restaurants),
      'Restaurants retrieved successfully',
    );
  }

  async getRestaurantById(
    id: Types.ObjectId,
  ): Promise<Result<IRestaurantResponseDTO>> {
    const document: RestaurantDocument =
      await this.restaurantRepository.findById(id);
    const restaurant = this.restaurantMapper.toDomain(document);
    return Result.ok(RestaurantParser.createRestaurantResponse(restaurant));
  }
}
