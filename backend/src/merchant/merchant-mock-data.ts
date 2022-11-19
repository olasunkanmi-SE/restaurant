import { Audit } from './../domain/audit/audit';
import { auditMockData } from './../audit/audit-mock-data';
import { Types } from 'mongoose';

export const merchantMockData: any = {
  id: new Types.ObjectId(),
  firstName: 'Ola',
  lastName: 'Ola',
  email: 'ola@tesla.com',
  organisationName: 'Tesla',
  phoneNumber: '123456',
  passwordHash: '',
  role: 'admin',
  isActive: true,
  status: 'onboard',
  organisationAddress: 'Malaysia',
  audit: Audit.create(auditMockData).getValue(),
};
