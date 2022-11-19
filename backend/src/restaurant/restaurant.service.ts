import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Context } from 'src/infrastructure/context';
import { TYPES } from './../application/constants/types';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { IContextService } from './../infrastructure/context/context-service.interface';
import { MerchantRepository } from './../infrastructure/data_access/repositories/merchant-repository';
import { IRestaurantRepository } from './../infrastructure/data_access/repositories/restaurant-repository.interface';
import { MerchantDocument } from './../infrastructure/data_access/repositories/schemas/merchant.schema';
import { RestaurantDocument } from './../infrastructure/data_access/repositories/schemas/restaurant.schema';
import { throwApplicationError } from './../infrastructure/utilities/exception-instance';
import { Location } from './../location/location';
import { IMerchantService } from './../merchant/interface/merchant-service.interface';
import { Merchant } from './../merchant/merchant';
import { MerchantMapper } from './../merchant/merchant.mapper';
import { IValidateUser } from './../utils/context-validation.interface';
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
    private readonly merchantMapper: MerchantMapper,
    @Inject(TYPES.IContextService) private readonly contextService: IContextService,
    @Inject(TYPES.IValidateUser) private readonly validateUser: IValidateUser,
    @Inject(TYPES.IMerchantService) private readonly merchantService: IMerchantService,
  ) {
    this.context = this.contextService.getContext();
  }

  async createRestaurant(createRestaurantDTO: CreateRestaurantDTO): Promise<Result<IRestaurantResponseDTO>> {
    const validateUser = await this.merchantService.validateContext();
    if (!validateUser) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid Email');
    }
    const restaurantDocuments: RestaurantDocument[] = await (await this.restaurantRepository.find({})).getValue();
    const existingEmail = restaurantDocuments.find((doc) => doc.email === createRestaurantDTO.email);

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
    const validateUser = await this.merchantService.validateContext();
    if (!validateUser) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid Email');
    }
    const restaurants: Restaurant[] = [];
    const documents: RestaurantDocument[] = await (await this.restaurantRepository.find({})).getValue();
    if (documents.length) {
      for (const document of documents) {
        restaurants.push(this.restaurantMapper.toDomain(document));
      }
    }
    const restaurantWithMerchantData: Restaurant[] = [];
    for (const restaurant of restaurants) {
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
    const document: RestaurantDocument = await result.getValue();
    const restaurant = this.restaurantMapper.toDomain(document);
    const restaurantWithMerchantData: Restaurant = await this.restaurantRepository.getRestaurantWithMerchantDetails(
      restaurant,
      restaurant.merchant.id,
    );
    const context = await this.contextService.getContext();
    const email = context.email;
    const userDoc = await this.merchantRepository.findOne({ email });
    const user: MerchantDocument = userDoc.getValue();
    if (user.id.toString() !== restaurantWithMerchantData.merchant.id.toString()) {
      throwApplicationError(HttpStatus.UNAUTHORIZED, 'You dont have sufficient priviledge');
    }
    return Result.ok(
      RestaurantParser.createRestaurantResponse(restaurantWithMerchantData),
      'Restaurant retrieved successfully',
    );
  }
}
