import { CategoryMapper } from './../../../category/category.mapper';
import { expect } from 'chai';
import mongoose, { Connection, Types } from 'mongoose';
import * as sinon from 'ts-sinon';
import { Mock } from 'typemoq';
import { AddonMapper } from '../../../addon';
import { GenericDocumentRepository } from '../../../infrastructure';
import { restaurantMockDocument } from '../../../restaurant/restaurant-mock-data';
import { AuditMapper } from './../../../audit/audit.mapper';
import { Result } from './../../../domain/result/result';
import { ItemMapper } from './../../../item/item.mapper';
import { LocationMapper } from './../../../location/location.mapper';
import { MenuMapper } from './../../../menu/menu.mapper';
import { MerchantMapper } from './../../../merchant/merchant.mapper';
import { Restaurant } from './../../../restaurant/restaurant';
import { RestaurantMapper } from './../../../restaurant/restaurant.mapper';
import { MerchantRepository } from './merchant.repository';
import { RestaurantRepository } from './restaurant.repository';
import { RestaurantDocument } from './schemas/restaurant.schema';

describe('test the restaurant service', () => {
  let connection: Connection;
  let modelId: Types.ObjectId;
  let restaurantsRepositoryMock: any;
  let restaurantRepository: RestaurantRepository;
  let restaurantMapperStub: any;
  beforeEach(async () => {
    connection = new Connection();
    modelId = new Types.ObjectId();
    const auditMapperStub = new AuditMapper();
    const merchantRepositoryStub: MerchantRepository = sinon.stubInterface<MerchantRepository>();
    const locationMapperStub = new LocationMapper(auditMapperStub);
    const merchantMapperStub = new MerchantMapper(auditMapperStub);
    const addonMapperStub = new AddonMapper();
    const itemMapperStub = new ItemMapper(auditMapperStub);
    const categoryMapperStub = new CategoryMapper();
    const menuMapper = new MenuMapper(auditMapperStub, itemMapperStub, categoryMapperStub, addonMapperStub);
    restaurantMapperStub = new RestaurantMapper(auditMapperStub, locationMapperStub, merchantMapperStub, menuMapper);
    restaurantsRepositoryMock = Mock.ofType<GenericDocumentRepository<Restaurant, RestaurantDocument>>();
    restaurantRepository = new RestaurantRepository(
      restaurantsRepositoryMock.target,
      connection,
      merchantRepositoryStub,
      restaurantMapperStub,
    );
  });
  afterEach(() => {
    connection.close();
    mongoose.disconnect();
  });
  const restaurantDocumentPromise = new Promise<RestaurantDocument>((resolve) => {
    return resolve(restaurantMockDocument);
  });

  it('Should return a restaurant', async () => {
    restaurantsRepositoryMock
      .setup((restaurantDocument) => restaurantDocument.findOne())
      .returns(() => restaurantDocumentPromise);
    const result: Result<Restaurant> = await restaurantRepository.findOne({
      name: 'Sheraton',
    });
    expect(result).to.have.length;
    expect(result.getValue().name).to.eq('Sheraton');
  });

  it('Should find a restaurant by id', async () => {
    restaurantsRepositoryMock
      .setup((restaurantDocument) => restaurantDocument.findOne())
      .returns(() => restaurantDocumentPromise);
    const result: Result<Restaurant> = await restaurantRepository.findOne({
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
    const result: Result<Restaurant> = await restaurantRepository.findOneAndUpdate(query, {
      $set: {
        name: 'Transcorp Hilton',
      },
    });
    expect(result);
  });
});
