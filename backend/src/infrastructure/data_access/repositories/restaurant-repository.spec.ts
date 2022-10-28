import { AuditMapper } from './../../../audit/audit.mapper';
import { MerchantMapper } from './../../../merchant/merchant.mapper';
import { expect } from 'chai';
import mongoose, { Connection, Types } from 'mongoose';
import * as sinon from 'ts-sinon';
import { It, Mock } from 'typemoq';
import { GenericDocumentRepository } from '../../../infrastructure';
import {
  restaurantMockData,
  restaurantMockDocument,
} from '../../../restaurant/restaurant-mock-data';
import { Restaurant } from './../../../restaurant/restaurant';
import { MerchantRepository } from './merchant-repository';
import { RestaurantRepository } from './restaurant.repository';
import {
  RestaurantData,
  RestaurantDocument,
} from './schemas/restaurant.schema';

describe('test the restaurant service', () => {
  let connection: Connection;
  let modelId: Types.ObjectId;
  let restaurantsRepositoryMock: any;
  let restaurantRepository;
  beforeEach(async () => {
    connection = new Connection();
    modelId = new Types.ObjectId();
    const merchantRepositoryStub: MerchantRepository =
      sinon.stubInterface<MerchantRepository>();
    const merchantMapperStub = new MerchantMapper(new AuditMapper());
    restaurantsRepositoryMock =
      Mock.ofType<GenericDocumentRepository<RestaurantDocument>>();
    restaurantRepository = await new RestaurantRepository(
      restaurantsRepositoryMock.target,
      connection,
      merchantRepositoryStub,
      merchantMapperStub,
    );
  });
  afterEach(() => {
    connection.close();
    mongoose.disconnect();
  });
  const restaurantDocumentPromise = new Promise<RestaurantDocument>(
    (resolve) => {
      return resolve(restaurantMockDocument);
    },
  );

  it('Should return restaurants', async () => {
    restaurantsRepositoryMock
      .setup((restaurantDocument) => restaurantDocument.find())
      .returns(() => [restaurantDocumentPromise]);
    const result: RestaurantData = await restaurantRepository.find({});
    expect(result).to.have.length;
  });

  it('Should return a restaurant', async () => {
    restaurantsRepositoryMock
      .setup((restaurantDocument) => restaurantDocument.findOne())
      .returns(() => restaurantDocumentPromise);
    const result: RestaurantData = await restaurantRepository.findOne({
      name: 'Sheraton',
    });
    expect(result).to.have.length;
    expect(result.name).to.eq('Sheraton');
  });

  it('Should find a restaurant by id', async () => {
    restaurantsRepositoryMock
      .setup((restaurantDocument) => restaurantDocument.findOne())
      .returns(() => restaurantDocumentPromise);
    const result: RestaurantData = await restaurantRepository.findOne({
      _id: modelId,
    });
    expect(result).to.have.length;
    expect(result.isActive).to.be.true;
  });

  it('Should create a restaurant', async () => {
    restaurantsRepositoryMock
      .setup((restaurantDocument) => restaurantDocument.create())
      .returns(() => restaurantDocumentPromise);
    restaurantsRepositoryMock
      .setup((restaurantDocument) => restaurantDocument.save(It.isAny()))
      .returns(() => restaurantMockData);
    const result: RestaurantData =
      await restaurantRepository.DocumentModel.create(
        await Restaurant.create(restaurantMockData).getValue(),
      );
    expect(result.email).to.eq('support@Sheraton.com');
  });

  it('Should find a restaurant and update a property', async () => {
    const query = { name: 'Sharaton' };
    restaurantsRepositoryMock.setup((restaurantDocument) =>
      restaurantDocument.findOneAndUpdate(),
    );
    restaurantsRepositoryMock
      .setup((restaurantDocument) => restaurantDocument.findByIdAndUpdate())
      .returns(() => restaurantDocumentPromise);
    const result: RestaurantData = await restaurantRepository.findOneAndUpdate(
      query,
      {
        $set: {
          name: 'Transcorp Hilton',
        },
      },
    );
    expect(result);
  });
});
