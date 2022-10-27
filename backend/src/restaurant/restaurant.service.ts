import { MerchantMapper } from './../merchant/merchant.mapper';
import { MerchantDocument } from './../infrastructure/data_access/repositories/schemas/merchant.schema';
import { MerchantRepository } from './../infrastructure/data_access/repositories/merchant-repository';
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
import { Merchant } from './../merchant/merchant';
@Injectable()
export class RestaurantService implements IRestaurantService {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly merchantRepository: MerchantRepository,
    private readonly restaurantMapper: RestaurantMapper,
    private readonly merchantMapper: MerchantMapper,
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
    const location: Location = Location.create(
      {
        ...createRestaurantDTO.location,
        audit,
      },
      new Types.ObjectId(),
    ).getValue();

    const merchantDoc: MerchantDocument =
      await this.merchantRepository.findById(createRestaurantDTO.merchantId);

    const merchant: Merchant = Merchant.create(
      this.merchantMapper.toDomain(merchantDoc),
      new Types.ObjectId(),
    ).getValue();

    const restaurant: Restaurant = Restaurant.create(
      {
        ...createRestaurantDTO,
        location,
        merchant,
        audit,
      },
      new Types.ObjectId(),
    ).getValue();

    const newRestaurant = await this.restaurantRepository.create(
      this.restaurantMapper.toPersistence(restaurant),
    );
    const rest = this.restaurantMapper.toDomain(newRestaurant);
    const restaurantWithMerchantDetails =
      await this.restaurantRepository.getRestaurantWithMerchantDetails(
        rest,
        createRestaurantDTO.merchantId,
      );

    return Result.ok(
      RestaurantParser.createRestaurantResponse(restaurantWithMerchantDetails),
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
