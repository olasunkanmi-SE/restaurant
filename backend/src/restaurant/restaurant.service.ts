import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';
import { Context } from '../infrastructure/context';
import { SingleClientRepository } from '../infrastructure/data_access/repositories/singleclient.repository';
import { TYPES } from './../application/constants/types';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { IContextService } from './../infrastructure/context/context-service.interface';
import { IMenuRepository, IRestaurantRepository } from './../infrastructure/data_access/repositories/interfaces';
import { throwApplicationError } from './../infrastructure/utilities/exception-instance';
import { Location } from './../location/location';
import { ISingleClientService } from './../singleclient/interface/singleclient-service.interface';
import { SingleClient } from './../singleclient/singleclient';
import { CreateRestaurantDTO } from './create-restaurant.dto';
import { Restaurant } from './restaurant';
import { IRestaurantResponseDTO } from './restaurant-response.dto';
import { IRestaurantService } from './restaurant-service.interface';
import { RestaurantMapper } from './restaurant.mapper';
import { RestaurantParser } from './restaurant.parser';
@Injectable()
export class RestaurantService implements IRestaurantService {
  private context: Context;
  constructor(
    @Inject(TYPES.IRestaurantRepository)
    private readonly restaurantRepository: IRestaurantRepository,
    private readonly singleclientRepository: SingleClientRepository,
    private readonly restaurantMapper: RestaurantMapper,
    @Inject(TYPES.IMenuRepository) private readonly menuRepository: IMenuRepository,
    @Inject(TYPES.IContextService) private readonly contextService: IContextService,
    @Inject(TYPES.ISingleClientService) private readonly singleclientService: ISingleClientService,
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.context = this.contextService.getContext();
  }

  async createRestaurant(props: CreateRestaurantDTO): Promise<Result<IRestaurantResponseDTO>> {
    const session = await this.connection.startSession();
    try {
      session.startTransaction();
      await this.singleclientService.validateContext();
      const restaurantEntity: Result<Restaurant[]> = await this.restaurantRepository.find({});
      const restaurants = restaurantEntity.getValue();
      const existingEmail = restaurants.find((doc) => doc.email === props.email);

      if (existingEmail) {
        throwApplicationError(HttpStatus.BAD_REQUEST, `Restaurant with email ${props.email} already exists`);
      }

      const audit: Audit = Audit.createInsertContext(this.context);
      const location: Location = Location.create(
        {
          ...props.location,
          audit,
        },
        new Types.ObjectId(),
      ).getValue();

      const result = await this.singleclientRepository.findById(props.singleclientId);
      const singleclient: SingleClient = result.getValue();

      let menus: [] = [];
      if (props.menus) {
        menus = await this.menuRepository.getMenus({ _id: { $in: props.menus } });
      }

      const restaurant: Restaurant = Restaurant.create(
        {
          ...props,
          location,
          singleclient,
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
      console.error(error);
    } finally {
      session.endSession();
    }
  }

  async getRestaurants(): Promise<Result<IRestaurantResponseDTO[]>> {
    await this.singleclientService.validateContext();
    const restaurants: Restaurant[] = await this.restaurantRepository.getRestaurants();
    return Result.ok(RestaurantParser.createRestaurantsParser(restaurants), 'Restaurants retrieved successfully');
  }

  async getRestaurantById(id: Types.ObjectId): Promise<Result<IRestaurantResponseDTO>> {
    await this.singleclientService.validateContext();
    const result = await this.restaurantRepository.findById(id);
    const restaurantId: Types.ObjectId = result.getValue().id;
    const restaurantWithSingleClientData: Restaurant = await this.restaurantRepository.getRestaurant(restaurantId);
    const context = this.contextService.getContext();
    const email = context.email;
    const userDoc = await this.singleclientRepository.findOne({ email });
    const user: SingleClient = userDoc.getValue();
    if (user.id.toString() !== restaurantWithSingleClientData.singleclient.id.toString()) {
      throwApplicationError(HttpStatus.UNAUTHORIZED, 'You dont have sufficient priviledge');
    }
    return Result.ok(
      RestaurantParser.createRestaurantResponse(restaurantWithSingleClientData),
      'Restaurant retrieved successfully',
    );
  }
}
