import { Audit } from './../domain/audit/audit';
import { auditMockData } from './../audit/audit-mock-data';
import { ILocation } from './location.interface';
export const locationMockData: ILocation = {
  address: 'Maitama',
  city: 'Abuja',
  country: 'Nigeria',
  postCode: '12345',
  state: 'FCT',
  audit: Audit.create(auditMockData).getValue(),
};
