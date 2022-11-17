import { expect } from 'chai';
import mongoose, { Connection, Types } from 'mongoose';
import * as sinon from 'ts-sinon';
import { Mock } from 'typemoq';
import { GenericDocumentRepository } from '../../../infrastructure';
import { restaurantMockDocument } from '../../../restaurant/restaurant-mock-data';
import { AuditMapper } from './../../../audit/audit.mapper';
import { Result } from './../../../domain/result/result';
import { MerchantMapper } from './../../../merchant/merchant.mapper';
import { Restaurant } from './../../../restaurant/restaurant';
import { MerchantRepository } from './merchant-repository';
import { RestaurantRepository } from './restaurant.repository';
import { RestaurantDocument } from './schemas/restaurant.schema';

describe('test the restaurant service', () => {
  let connection: Connection;
  let modelId: Types.ObjectId;
  let restaurantsRepositoryMock: any;
  let restaurantRepository: RestaurantRepository;
  beforeEach(async () => {
    connection = new Connection();
    modelId = new Types.ObjectId();
    const merchantRepositoryStub: MerchantRepository = sinon.stubInterface<MerchantRepository>();
    const merchantMapperStub = new MerchantMapper(new AuditMapper());
    restaurantsRepositoryMock = Mock.ofType<GenericDocumentRepository<RestaurantDocument>>();
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
  const restaurantDocumentPromise = new Promise<RestaurantDocument>((resolve) => {
    return resolve(restaurantMockDocument);
  });

  it('Should return restaurants', async () => {
    restaurantsRepositoryMock
      .setup((restaurantDocument) => restaurantDocument.find())
      .returns(() => [restaurantDocumentPromise]);
    const result: Result<RestaurantDocument[]> = await restaurantRepository.find({});
    expect(result).to.have.length;
  });

  it('Should return a restaurant', async () => {
    restaurantsRepositoryMock
      .setup((restaurantDocument) => restaurantDocument.findOne())
      .returns(() => restaurantDocumentPromise);
    const result: Result<RestaurantDocument> = await restaurantRepository.findOne({
      name: 'Sheraton',
    });
    expect(result).to.have.length;
    expect(result.getValue().name).to.eq('Sheraton');
  });

  it('Should find a restaurant by id', async () => {
    restaurantsRepositoryMock
      .setup((restaurantDocument) => restaurantDocument.findOne())
      .returns(() => restaurantDocumentPromise);
    const result: Result<RestaurantDocument> = await restaurantRepository.findOne({
      _id: modelId,
    });
    expect(result).to.have.length;
    expect(result.getValue().isActive).to.be.true;
  });

  it('Should create a restaurant', async () => {
    const result = Restaurant.create(restaurantMockDocument, new Types.ObjectId()).getValue();
    expect(result.email).to.eq('support@Sheraton.com');
  });

  it('Should find a restaurant and update a property', async () => {
    const query = { name: 'Sharaton' };
    restaurantsRepositoryMock.setup((restaurantDocument) => restaurantDocument.findOneAndUpdate());
    restaurantsRepositoryMock
      .setup((restaurantDocument) => restaurantDocument.findByIdAndUpdate())
      .returns(() => restaurantDocumentPromise);
    const result: Result<RestaurantDocument> = await restaurantRepository.findOneAndUpdate(query, {
      $set: {
        name: 'Transcorp Hilton',
      },
    });
    expect(result);
  });
});
