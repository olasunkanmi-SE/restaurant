import { RestaurantRepository } from './restaurant.repository';
import mongoose, { Connection, Types } from 'mongoose';
import { RestaurantDocument } from './schemas/restaurant.schema';
import { restaurantMockDocument } from '../../../restaurant/restaurant-mock-data';
import { Mock } from 'typemoq';
import { GenericDocumentRepository } from 'src/infrastructure';
import { expect } from 'chai';

describe('test the restaurant service', () => {
  let connection: Connection;
  let modelId: Types.ObjectId;
  beforeEach(() => {
    connection = new Connection();
    modelId = new Types.ObjectId();
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
    const restaurantsRepositoryMock: any =
      Mock.ofType<GenericDocumentRepository<RestaurantDocument>>();
    restaurantsRepositoryMock
      .setup((restaurantDocument) => restaurantDocument.find({}))
      .returns(() => [restaurantDocumentPromise]);

    const restaurantRepository = new RestaurantRepository(
      restaurantsRepositoryMock.target,
      connection,
    );
    const result = await restaurantRepository.find({});
    expect(result).to.have.length;
  });

  it('Should return a restaurant', async () => {
    const restaurantsRepositoryMock: any =
      Mock.ofType<GenericDocumentRepository<RestaurantDocument>>();
    restaurantsRepositoryMock
      .setup((restaurantDocument) =>
        restaurantDocument.findOne({ name: 'Sheraton' }),
      )
      .returns(() => restaurantDocumentPromise);

    const restaurantRepository = new RestaurantRepository(
      restaurantsRepositoryMock.target,
      connection,
    );
    const result = await restaurantRepository.findOne({ name: 'Sheraton' });
    expect(result).to.have.length;
  });

  it('Should find a restaurant by id', async () => {
    const restaurantsRepositoryMock: any =
      Mock.ofType<GenericDocumentRepository<RestaurantDocument>>();
    restaurantsRepositoryMock
      .setup((restaurantDocument) =>
        restaurantDocument.findOne({ _id: modelId }),
      )
      .returns(() => restaurantDocumentPromise);

    const restaurantRepository = new RestaurantRepository(
      restaurantsRepositoryMock.target,
      connection,
    );
    const result = await restaurantRepository.findOne({ _id: modelId });
    expect(result).to.have.length;
  });
});
