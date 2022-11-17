import { IContextService } from './../infrastructure/context/context-service.interface';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { TYPES } from './../application/constants/types';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { MerchantRepository } from './../infrastructure/data_access/repositories/merchant-repository';
import { IRestaurantRepository } from './../infrastructure/data_access/repositories/restaurant-repository.interface';
import { MerchantDocument } from './../infrastructure/data_access/repositories/schemas/merchant.schema';
import { RestaurantDocument } from './../infrastructure/data_access/repositories/schemas/restaurant.schema';
import { Location } from './../location/location';
import { Merchant } from './../merchant/merchant';
import { MerchantMapper } from './../merchant/merchant.mapper';
import { CreateRestaurantDTO } from './create-restaurant.dto';
import { Restaurant } from './restaurant';
import { IRestaurantResponseDTO } from './restaurant-response.dto';
import { IRestaurantService } from './restaurant-service.interface';
import { RestaurantMapper } from './restaurant.mapper';
import { RestaurantParser } from './restaurant.parser';
import { Context } from 'src/infrastructure/context';
@Injectable()
export class RestaurantService implements IRestaurantService {
  constructor(
    @Inject(TYPES.IRestaurantRepository)
    private readonly restaurantRepository: IRestaurantRepository,
    private readonly merchantRepository: MerchantRepository,
    private readonly restaurantMapper: RestaurantMapper,
    private readonly merchantMapper: MerchantMapper,
    @Inject(TYPES.IContextService)
    private readonly contextService: IContextService,
  ) {}

  async createRestaurant(createRestaurantDTO: CreateRestaurantDTO): Promise<Result<IRestaurantResponseDTO>> {
    const restaurantDocuments: RestaurantDocument[] = await (await this.restaurantRepository.find({})).getValue();

    const existingEmail = restaurantDocuments.find((doc) => doc.email === createRestaurantDTO.email);

    if (existingEmail) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Restaurant with email ${createRestaurantDTO.email} already exists`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const context: Context = this.contextService.getContext();
    const audit: Audit = Audit.createInsertContext(context);
    const location: Location = Location.create(
      {
        ...createRestaurantDTO.location,
        audit,
      },
      new Types.ObjectId(),
    ).getValue();

    const result = await this.merchantRepository.findById(createRestaurantDTO.merchantId);

    const merchantDoc: MerchantDocument = result.getValue();

    const merchant: Merchant = this.merchantMapper.toDomain(merchantDoc);

    const restaurant: Restaurant = Restaurant.create(
      {
        ...createRestaurantDTO,
        location,
        merchant,
        audit,
      },
      new Types.ObjectId(),
    ).getValue();

    const docResult = await this.restaurantRepository.create(this.restaurantMapper.toPersistence(restaurant));
    const newRestaurantDoc = docResult.getValue();
    const rest = this.restaurantMapper.toDomain(newRestaurantDoc);
    const restaurantWithMerchantDetails = await this.restaurantRepository.getRestaurantWithMerchantDetails(
      rest,
      createRestaurantDTO.merchantId,
    );

    return Result.ok(RestaurantParser.createRestaurantResponse(restaurantWithMerchantDetails));
  }

  async getRestaurants(): Promise<Result<IRestaurantResponseDTO[]>> {
    const restaurants: Restaurant[] = [];
    const documents: RestaurantDocument[] = await (await this.restaurantRepository.find({})).getValue();
    if (documents.length) {
      for (const document of documents) {
        restaurants.push(this.restaurantMapper.toDomain(document));
      }
    }
    return Result.ok(RestaurantParser.createRestaurantsParser(restaurants), 'Restaurants retrieved successfully');
  }

  async getRestaurantById(id: Types.ObjectId): Promise<Result<IRestaurantResponseDTO>> {
    const result = await this.restaurantRepository.findById(id);
    const document: RestaurantDocument = await result.getValue();
    const restaurant = this.restaurantMapper.toDomain(document);
    return Result.ok(RestaurantParser.createRestaurantResponse(restaurant));
  }
}
