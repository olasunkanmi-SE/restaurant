import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Context } from '../infrastructure/context';
import { TYPES } from './../application/constants/types';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { IContextService } from './../infrastructure/context/context-service.interface';
import { MerchantRepository } from '../infrastructure/data_access/repositories/merchant.repository';
import { IRestaurantRepository } from './../infrastructure/data_access/repositories/restaurant-repository.interface';
import { throwApplicationError } from './../infrastructure/utilities/exception-instance';
import { Location } from './../location/location';
import { IMerchantService } from './../merchant/interface/merchant-service.interface';
import { Merchant } from './../merchant/merchant';
import { CreateRestaurantDTO } from './create-restaurant.dto';
import { Restaurant } from './restaurant';
import { IRestaurantResponseDTO } from './restaurant-response.dto';
import { IRestaurantService } from './restaurant-service.interface';
import { RestaurantMapper } from './restaurant.mapper';
import { RestaurantParser } from './restaurant.parser';
@Injectable()
export class RestaurantService implements IRestaurantService {
  private context: Promise<Context>;
  constructor(
    @Inject(TYPES.IRestaurantRepository)
    private readonly restaurantRepository: IRestaurantRepository,
    private readonly merchantRepository: MerchantRepository,
    private readonly restaurantMapper: RestaurantMapper,
    @Inject(TYPES.IContextService) private readonly contextService: IContextService,
    @Inject(TYPES.IMerchantService) private readonly merchantService: IMerchantService,
  ) {
    this.context = this.contextService.getContext();
  }

  async createRestaurant(createRestaurantDTO: CreateRestaurantDTO): Promise<Result<IRestaurantResponseDTO>> {
    const validateUser = await this.merchantService.validateContext();
    if (!validateUser) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid Email');
    }
    const restaurantEntity: Result<Restaurant[]> = await this.restaurantRepository.find({});
    const restaurants = restaurantEntity.getValue();
    const existingEmail = restaurants.find((doc) => doc.email === createRestaurantDTO.email);

    if (existingEmail) {
      throwApplicationError(
        HttpStatus.BAD_REQUEST,
        `Restaurant with email ${createRestaurantDTO.email} already exists`,
      );
    }

    const audit: Audit = Audit.createInsertContext(await this.context);
    const location: Location = Location.create(
      {
        ...createRestaurantDTO.location,
        audit,
      },
      new Types.ObjectId(),
    ).getValue();

    const result = await this.merchantRepository.findById(createRestaurantDTO.merchantId);
    const merchant: Merchant = result.getValue();

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
    const newRestaurant = docResult.getValue();
    const restaurantWithMerchantDetails = await this.restaurantRepository.getRestaurantWithMerchantDetails(
      newRestaurant,
      createRestaurantDTO.merchantId,
    );

    return Result.ok(RestaurantParser.createRestaurantResponse(restaurantWithMerchantDetails));
  }

  async getRestaurants(): Promise<Result<IRestaurantResponseDTO[]>> {
    const validateUser = await this.merchantService.validateContext();
    if (!validateUser) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid Email');
    }
    const restaurants: Result<Restaurant[]> = await this.restaurantRepository.find({});
    const restaurantValue = restaurants.getValue();
    const restaurantWithMerchantData: Restaurant[] = [];
    for (const restaurant of restaurantValue) {
      restaurantWithMerchantData.push(
        await this.restaurantRepository.getRestaurantWithMerchantDetails(restaurant, restaurant.merchant.id),
      );
    }
    return Result.ok(
      RestaurantParser.createRestaurantsParser(restaurantWithMerchantData),
      'Restaurants retrieved successfully',
    );
  }

  async getRestaurantById(id: Types.ObjectId): Promise<Result<IRestaurantResponseDTO>> {
    const validateUser = await this.merchantService.validateContext();
    if (!validateUser) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid Email');
    }
    const result = await this.restaurantRepository.findById(id);
    const restaurant: Restaurant = result.getValue();
    const restaurantWithMerchantData: Restaurant = await this.restaurantRepository.getRestaurantWithMerchantDetails(
      restaurant,
      restaurant.merchant.id,
    );
    const context = await this.contextService.getContext();
    const email = context.email;
    const userDoc = await this.merchantRepository.findOne({ email });
    const user: Merchant = userDoc.getValue();
    if (user.id.toString() !== restaurantWithMerchantData.merchant.id.toString()) {
      throwApplicationError(HttpStatus.UNAUTHORIZED, 'You dont have sufficient priviledge');
    }
    return Result.ok(
      RestaurantParser.createRestaurantResponse(restaurantWithMerchantData),
      'Restaurant retrieved successfully',
    );
  }
}
