import { Merchant } from './merchant';
import { IMerchant } from './interface/merchant.interface';
import { Audit } from './../domain/audit/audit';
import { auditMockData } from './../audit/audit-mock-data';
import { Types } from 'mongoose';

export const merchantMock: IMerchant = {
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

export const merchantMockData = Merchant.create(merchantMock, new Types.ObjectId());

const merchant = merchantMockData.getValue();
const merchants: Merchant[] = [];
merchants.push(merchant);
export const merchantMockDatas = merchants;
