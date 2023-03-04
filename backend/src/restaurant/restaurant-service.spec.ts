import { menuMockData } from './../menu/menu-mock.data';
import { IMenuRepository } from './../infrastructure/data_access/repositories/interfaces/menu-repository.interface';
import { expect } from 'chai';
import mongoose, { Connection, Types } from 'mongoose';
import * as sinon from 'ts-sinon';
import { MerchantRepository } from '../infrastructure/data_access/repositories/merchant.repository';
import { MenuMapper } from '../menu/menu.mapper';
import { Merchant } from '../merchant';
import { AddonMapper } from './../addon/addon.mapper';
import { auditMockData } from './../audit/audit-mock-data';
import { AuditMapper } from './../audit/audit.mapper';
import { CategoryMapper } from './../category/category.mapper';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { Context, MerchantDocument } from './../infrastructure';
import { IContextService } from './../infrastructure/context/context-service.interface';
import { IRestaurantRepository } from './../infrastructure/data_access/repositories/interfaces/restaurant-repository.interface';
import { ItemMapper } from './../item/item.mapper';
import { LocationMapper } from './../location/location.mapper';
import { IMerchantService } from './../merchant/interface/merchant-service.interface';
import { merchantMockData } from './../merchant/merchant-mock-data';
import { MerchantMapper } from './../merchant/merchant.mapper';
import { IValidateUser } from './../utils/context-validation.interface';
import { Restaurant } from './restaurant';
import {
  restaurantMock,
  restaurantMockData,
  restaurantMockDatas,
  restaurantMockDocument,
} from './restaurant-mock-data';
import { IRestaurantResponseDTO } from './restaurant-response.dto';
import { RestaurantMapper } from './restaurant.mapper';
import { RestaurantService } from './restaurant.service';

describe('Test restaurant service', () => {
  let connection: Connection;
  beforeEach(async () => {
    connection = new Connection();
  });
  afterEach(() => {
    connection.close();
    mongoose.disconnect();
  });
  const restaurantRepositoryStub: IRestaurantRepository = sinon.stubInterface<IRestaurantRepository>();
  const merchantRepositoryStub: MerchantRepository = sinon.stubInterface<MerchantRepository>();
  const auditMapperStub = new AuditMapper();
  const locationMapperStub = new LocationMapper(auditMapperStub);
  const merchantMapperStub = new MerchantMapper(auditMapperStub);
  const addonMapperStub = new AddonMapper(auditMapperStub);
  const itemMapperStub = new ItemMapper(auditMapperStub);
  const categoryMapperStub = new CategoryMapper();
  const menuMapperStub = new MenuMapper(auditMapperStub, itemMapperStub, categoryMapperStub, addonMapperStub);
  const restaurantMapperStub: RestaurantMapper = new RestaurantMapper(
    new AuditMapper(),
    locationMapperStub,
    merchantMapperStub,
    menuMapperStub,
  );
  const contextServiceStub: IContextService = sinon.stubInterface<IContextService>();
  const validateUserStub: IValidateUser<Merchant, MerchantDocument> =
    sinon.stubInterface<IValidateUser<Merchant, MerchantDocument>>();
  const merchantServiceStub: IMerchantService = sinon.stubInterface<IMerchantService>();
  const menuRepositoryStub: IMenuRepository = sinon.stubInterface<IMenuRepository>();
  const restaurantService = new RestaurantService(
    restaurantRepositoryStub,
    merchantRepositoryStub,
    restaurantMapperStub,
    menuRepositoryStub,
    contextServiceStub,
    merchantServiceStub,
    connection,
  );
  const contextPromise = new Context('Komune@Komune.com', '');
  let createRestaurantDTO: any = {
    name: 'Komune living',
    email: 'Komune@Komune.com',
    isActive: true,
    location: {
      postCode: '12345',
      address: 'Maitama',
      city: 'Abuja',
      country: 'Nigeria',
      state: 'FCT',
    },
    merchantId: new Types.ObjectId(),
    audit: {
      auditCreatedBy: '',
      auditCreatedDateTime: new Date(),
    },
    menus: [menuMockData],
  };
  it('Create a restaurant', async () => {
    contextServiceStub.getContext = (): Context => {
      return contextPromise;
    };

    merchantServiceStub.validateContext = async (): Promise<any | undefined> => {
      return merchantMockData;
    };
    restaurantRepositoryStub.find = async (): Promise<Result<Restaurant[]>> => {
      return Result.ok(restaurantMockDatas);
    };
    Audit.createInsertContext = (): Audit => {
      return Audit.create(auditMockData).getValue();
    };
    merchantRepositoryStub.findById = async (): Promise<Result<Merchant>> => {
      return merchantMockData;
    };
    const restaurant = Restaurant.create(restaurantMock).getValue();
    restaurantMapperStub.toPersistence(restaurant);
    restaurantRepositoryStub.create = async (): Promise<Result<Restaurant>> => {
      return restaurantMockData;
    };
    restaurantRepositoryStub.getRestaurants = async (): Promise<Restaurant[]> => {
      return restaurantMockDatas;
    };
    // const result: Result<IRestaurantResponseDTO> = await restaurantService.createRestaurant(createRestaurantDTO);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // expect(result.data).to.not.be.undefined;
    // expect(result.isSuccess).to.be.true;
  });

  it('Should throw an exception if restaurant email exists', async () => {
    try {
      contextServiceStub.getContext = (): Context => {
        return contextPromise;
      };
      validateUserStub.getUser = async (): Promise<any | undefined> => {
        return restaurantMockDocument;
      };
      restaurantRepositoryStub.find = async (): Promise<Result<Restaurant[]>> => {
        return Result.ok(restaurantMockDatas);
      };
      createRestaurantDTO = {
        ...createRestaurantDTO,
        email: 'support@Sheraton.com',
      };
      await restaurantService.createRestaurant(createRestaurantDTO);
    } catch (error: any) {
      // expect(error.status).to.eq(400);
      // expect(error.response.error).to.eq('Restaurant with email support@Sheraton.com already exists');
    }
  });

  it('Should get Restaurants', async () => {
    contextServiceStub.getContext = (): Context => {
      return contextPromise;
    };
    validateUserStub.getUser = async (): Promise<any | undefined> => {
      return restaurantMockDocument;
    };
    restaurantRepositoryStub.getRestaurants = async (): Promise<Restaurant[]> => {
      return restaurantMockDatas;
    };
    restaurantMapperStub.toDomain(restaurantMockDocument);
    const result: Result<IRestaurantResponseDTO[]> = await restaurantService.getRestaurants();
    expect(result.message).to.eq('Restaurants retrieved successfully');
    expect(result.isSuccess).to.be.true;
  });
});
