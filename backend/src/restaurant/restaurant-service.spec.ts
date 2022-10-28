import { expect } from 'chai';
import { Types } from 'mongoose';
import * as sinon from 'ts-sinon';
import { auditMockData } from './../audit/audit-mock-data';
import { AuditMapper } from './../audit/audit.mapper';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { MerchantRepository } from './../infrastructure/data_access/repositories/merchant-repository';
import { IRestaurantRepository } from './../infrastructure/data_access/repositories/restaurant-repository.interface';
import { MerchantDocument } from './../infrastructure/data_access/repositories/schemas/merchant.schema';
import { RestaurantDocument } from './../infrastructure/data_access/repositories/schemas/restaurant.schema';
import { LocationMapper } from './../location/location.mapper';
import { merchantMockData } from './../merchant/merchant-mock-data';
import { MerchantMapper } from './../merchant/merchant.mapper';
import { Restaurant } from './restaurant';
import {
  restaurantMockData,
  restaurantMockDocument,
} from './restaurant-mock-data';
import { IRestaurantResponseDTO } from './restaurant-response.dto';
import { RestaurantMapper } from './restaurant.mapper';
import { RestaurantService } from './restaurant.service';

describe('Test restaurant service', () => {
  const restaurantRepositoryStub: IRestaurantRepository =
    sinon.stubInterface<IRestaurantRepository>();
  const merchantRepositoryStub: MerchantRepository =
    sinon.stubInterface<MerchantRepository>();
  const locationMapperStub = new LocationMapper(new AuditMapper());
  const merchantMapperStub = new MerchantMapper(new AuditMapper());
  const restaurantMapperStub: RestaurantMapper = new RestaurantMapper(
    new AuditMapper(),
    locationMapperStub,
    merchantMapperStub,
  );
  const restaurantService = new RestaurantService(
    restaurantRepositoryStub,
    merchantRepositoryStub,
    restaurantMapperStub,
    merchantMapperStub,
  );
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
  };
  it('Create a restaurant', async () => {
    restaurantRepositoryStub.find = async (): Promise<RestaurantDocument[]> => {
      return [restaurantMockDocument];
    };
    Audit.createInsertContext = (): Audit => {
      return Audit.create(auditMockData).getValue();
    };
    merchantRepositoryStub.findById = async (): Promise<MerchantDocument> => {
      return merchantMockData;
    };
    const restaurant = Restaurant.create(restaurantMockData).getValue();
    restaurantMapperStub.toPersistence(restaurant);
    restaurantRepositoryStub.create = async (): Promise<RestaurantDocument> => {
      return restaurantMockDocument;
    };
    restaurantRepositoryStub.getRestaurantWithMerchantDetails =
      async (): Promise<Restaurant> => {
        return restaurant;
      };
    const result: Result<IRestaurantResponseDTO> =
      await restaurantService.createRestaurant(createRestaurantDTO);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(result.data).to.not.be.undefined;
    expect(result.isSuccess).to.be.true;
  });

  it('Should throw an exception if restaurant email exists', async () => {
    try {
      restaurantRepositoryStub.find = async (): Promise<
        RestaurantDocument[]
      > => {
        return [restaurantMockDocument];
      };
      createRestaurantDTO = {
        ...createRestaurantDTO,
        email: 'support@Sheraton.com',
      };
      await restaurantService.createRestaurant(createRestaurantDTO);
    } catch (error) {
      expect(error.status).to.eq(400);
      expect(error.response.error).to.eq(
        'Restaurant with email support@Sheraton.com already exists',
      );
    }
  });

  it('Should get Restaurants', async () => {
    restaurantRepositoryStub.find = async (): Promise<RestaurantDocument[]> => {
      return [restaurantMockDocument];
    };
    restaurantMapperStub.toDomain(restaurantMockDocument);
    const result: Result<IRestaurantResponseDTO[]> =
      await restaurantService.getRestaurants();
    expect(result.message).to.eq('Restaurants retrieved successfully');
    expect(result.isSuccess).to.be.true;
  });

  it('Should get a restaurant by Id', async () => {
    restaurantRepositoryStub.findById =
      async (): Promise<RestaurantDocument> => {
        return restaurantMockDocument;
      };
    restaurantMapperStub.toDomain(restaurantMockDocument);
    const result: Result<IRestaurantResponseDTO> =
      await restaurantService.getRestaurantById(new Types.ObjectId());
    expect(result.isSuccess).to.be.true;
  });
});
