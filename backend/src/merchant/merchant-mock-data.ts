import { Audit } from './../domain/audit/audit';
import { auditMockData } from './../audit/audit-mock-data';

export const merchantMockData: any = {
  firstName: 'Ola',
  lastName: 'Ola',
  email: 'ola@tesla.com',
  organisationName: 'Tesla',
  phoneNumber: '123456',
  passwordHash: '2345678uhbnewnjdk',
  role: 'admin',
  isActive: true,
  status: 'onboard',
  organisationAddress: 'Malaysia',
  audit: Audit.create(auditMockData).getValue(),
};
