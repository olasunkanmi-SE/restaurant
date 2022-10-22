import { auditMockData } from './../audit/audit-mock-data';
import { Audit } from '.././domain/audit';
import { Location } from './../location/location';
import { locationMockData } from './../location/location-mock-data';
import { IRestaurant } from './restaurant.interface';

export const restaurantMockData: IRestaurant = {
  name: 'Sheraton hotel and towers',
  email: 'support@Sheraton.com',
  isActive: true,
  location: Location.create(locationMockData).getValue(),
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
  auditModifiedBy: '',
  auditCreatedBy: 'Ola',
  auditCreatedDateTime: new Date(),
};
