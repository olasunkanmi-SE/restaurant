import { expect } from 'chai';
import mongoose, { Connection, Types } from 'mongoose';
import { GenericDocumentRepository } from 'src/infrastructure';
import { Mock } from 'typemoq';
import { restaurantMockDocument } from '../../../restaurant/restaurant-mock-data';
import { RestaurantRepository } from './restaurant.repository';
import {
  RestaurantDocument,
  RestaurantData,
} from './schemas/restaurant.schema';

describe('test the restaurant service', () => {
  let connection: Connection;
  let modelId: Types.ObjectId;
  let restaurantsRepositoryMock: any;
  let restaurantRepository;
  beforeEach(async () => {
    connection = new Connection();
    modelId = new Types.ObjectId();
    restaurantsRepositoryMock =
      Mock.ofType<GenericDocumentRepository<RestaurantDocument>>();
    restaurantRepository = await new RestaurantRepository(
      restaurantsRepositoryMock.target,
      connection,
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

  // it('Should create a restaurant', async () => {
  //   restaurantsRepositoryMock.setup((restaurantDocument) =>
  //     restaurantDocument.create(),
  //   );
  //   restaurantsRepositoryMock
  //     .setup((restaurantDocument) =>
  //       restaurantDocument.DocumentModel.save(It.isAny()),
  //     )
  //     .returns(() => restaurantMockData);
  //   const result: RestaurantData = await restaurantRepository.create(
  //     await Restaurant.create(restaurantMockData).getValue(),
  //   );
  //   expect(result.email).to.eq('support@Sheraton.com');
  // });

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
