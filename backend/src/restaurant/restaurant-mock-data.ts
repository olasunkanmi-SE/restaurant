import { Audit } from '.././domain/audit';
import { auditMockData } from './../audit/audit-mock-data';
import { Location } from './../location/location';
import { locationMockData } from './../location/location-mock-data';
import { Merchant } from './../merchant/merchant';
import { merchantMockData } from './../merchant/merchant-mock-data';
import { IRestaurant } from './restaurant.interface';

export const restaurantMockData: IRestaurant = {
  name: 'Sheraton hotel and towers',
  email: 'support@Sheraton.com',
  isActive: true,
  phoneNumber: '018938383',
  location: Location.create(locationMockData).getValue(),
  merchant: Merchant.create(merchantMockData).getValue(),
  audit: Audit.create(auditMockData).getValue(),
};

export const restaurantMockDocument: any = {
  name: 'Sheraton',
  email: 'support@Sheraton.com',
  isActive: true,
  location: {
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
};
