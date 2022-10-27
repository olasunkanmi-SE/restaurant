import { Audit } from './../domain/audit/audit';
import { auditMockData } from './../audit/audit-mock-data';
export const merchantMockData: any = {
  firstName: 'Ola',
  lastName: 'Ola',
  email: 'ola@tesla.com',
  organisationName: 'Tesla',
  phoneNumber: '123456',
  passwordHash: '23rt565regf3454t',
  role: 'admin',
  isActive: true,
  status: 'onboard',
  organisationAddress: 'Malaysia',
  audit: Audit.create(auditMockData).getValue(),
};
