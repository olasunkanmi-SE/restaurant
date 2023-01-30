import { Types } from 'mongoose';
import { Audit } from '.././domain/audit';
import { auditMockData } from './../audit/audit-mock-data';
import { Location } from './../location/location';
import { locationMockData } from './../location/location-mock-data';
import { Menu } from './../menu/menu';
import { menuMockData } from './../menu/menu-mock.data';
import { Merchant } from './../merchant/merchant';
import { merchantMock, merchantMockData } from './../merchant/merchant-mock-data';
import { Restaurant } from './restaurant';
import { IRestaurant } from './restaurant.interface';

export const restaurantMock: IRestaurant = {
  name: 'Sheraton hotel and towers',
  email: 'support@Sheraton.com',
  isActive: true,
  phoneNumber: '018938383',
  imageUrl: 'http://',
  opened: false,
  paymentMethod: [],
  openingHour: 0,
  closingHour: 0,
  menus: [Menu.create(menuMockData).getValue()],
  location: Location.create(locationMockData).getValue(),
  merchant: Merchant.create(merchantMock).getValue(),
  audit: Audit.create(auditMockData).getValue(),
};

export const restaurantMockData: any = Restaurant.create(restaurantMock);
const restaurant = restaurantMockData.getValue();
const restaurants: Restaurant[] = [];
restaurants.push(restaurant);
export const restaurantMockDatas = restaurants;

export const restaurantMockDocument: any = {
  _id: new Types.ObjectId(),
  name: 'Sheraton',
  email: 'support@Sheraton.com',
  isActive: true,
  location: {
    _id: new Types.ObjectId(),
    address: 'Maitama',
    address2: '',
    city: 'Abuja',
    country: 'Nigeria',
    postCode: '12345',
    state: 'FCT',
    auditModifiedBy: '',
    auditCreatedBy: 'Ola',
    auditCreatedDateTime: new Date(),
  },
  merchant: merchantMockData,
  auditModifiedBy: '',
  auditCreatedBy: 'Ola',
  auditCreatedDateTime: new Date(),
  menus: [menuMockData],
  audit: Audit.create(auditMockData).getValue(),
};
