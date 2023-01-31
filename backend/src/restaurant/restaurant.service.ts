import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';
import { Context } from '../infrastructure/context';
import { MerchantRepository } from '../infrastructure/data_access/repositories/merchant.repository';
import { TYPES } from './../application/constants/types';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { IContextService } from './../infrastructure/context/context-service.interface';
import { IMenuRepository } from './../infrastructure/data_access/repositories/menu-repository.interface';
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
    @Inject(TYPES.IMenuRepository) private readonly menuRepository: IMenuRepository,
    @Inject(TYPES.IContextService) private readonly contextService: IContextService,
    @Inject(TYPES.IMerchantService) private readonly merchantService: IMerchantService,
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.context = this.contextService.getContext();
  }

  async createRestaurant(props: CreateRestaurantDTO): Promise<Result<IRestaurantResponseDTO>> {
    const session = await this.connection.startSession();
    try {
      const validateUser = await this.merchantService.validateContext();
      if (!validateUser) {
        throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid Email');
      }
      const restaurantEntity: Result<Restaurant[]> = await this.restaurantRepository.find({});
      const restaurants = restaurantEntity.getValue();
      const existingEmail = restaurants.find((doc) => doc.email === props.email);

      if (existingEmail) {
        throwApplicationError(HttpStatus.BAD_REQUEST, `Restaurant with email ${props.email} already exists`);
      }

      const audit: Audit = Audit.createInsertContext(await this.context);
      const location: Location = Location.create(
        {
          ...props.location,
          audit,
        },
        new Types.ObjectId(),
      ).getValue();

      const result = await this.merchantRepository.findById(props.merchantId);
      const merchant: Merchant = result.getValue();

      let menus: [] = [];
      if (props.menus) {
        menus = await this.menuRepository.getMenus({ _id: { $in: props.menus } });
      }

      const restaurant: Restaurant = Restaurant.create(
        {
          ...props,
          location,
          merchant,
          menus,
          audit,
        },
        new Types.ObjectId(),
      ).getValue();

      const docResult = await this.restaurantRepository.create(this.restaurantMapper.toPersistence(restaurant));
      if (!docResult.isSuccess) {
        throwApplicationError(HttpStatus.BAD_REQUEST, 'Restaurant could not be created try again later');
      }
      await session.commitTransaction();
      const newRestaurant = docResult.getValue();
      const response = await this.restaurantRepository.getRestaurant(newRestaurant.id);
      return Result.ok(RestaurantParser.createRestaurantResponse(response));
    } catch (error) {
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  }

  async getRestaurants(): Promise<Result<IRestaurantResponseDTO[]>> {
    const validateUser = await this.merchantService.validateContext();
    if (!validateUser) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid Email');
    }
    const restaurants: Restaurant[] = await this.restaurantRepository.getRestaurants();
    return Result.ok(RestaurantParser.createRestaurantsParser(restaurants), 'Restaurants retrieved successfully');
  }

  async getRestaurantById(id: Types.ObjectId): Promise<Result<IRestaurantResponseDTO>> {
    const validateUser = await this.merchantService.validateContext();
    if (!validateUser) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid Email');
    }
    const result = await this.restaurantRepository.findById(id);
    const restaurantId: Types.ObjectId = result.getValue().id;
    const restaurantWithMerchantData: Restaurant = await this.restaurantRepository.getRestaurant(restaurantId);
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
