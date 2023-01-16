import { expect } from 'chai';
import { Types } from 'mongoose';
import * as sinon from 'ts-sinon';
import { auditMockData } from './../audit/audit-mock-data';
import { AuditMapper } from './../audit/audit.mapper';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { IAuthService } from './../infrastructure/auth/interfaces/auth-service.interface';
import { Context } from './../infrastructure/context';
import { IContextService } from './../infrastructure/context/context-service.interface';
import { MerchantRepository } from './../infrastructure/data_access/repositories/merchant-repository';
import { IValidateUser } from './../utils/context-validation.interface';
import { merchantMockData, merchantMockDatas } from './merchant-mock-data';
import { MerchantParser } from './merchant-parser';
import { IMerchantResponseDTO } from './merchant-response.dto';
import { MerchantMapper } from './merchant.mapper';
import { MerchantService } from './merchant.service';
import { Merchant } from './merchant';
import { MerchantDocument } from 'src/infrastructure';

describe('Test merchant service', () => {
  const merchantRepositoryStub: MerchantRepository = sinon.stubInterface<MerchantRepository>();

  const merchantMapperStub: MerchantMapper = new MerchantMapper(new AuditMapper());
  const authServiceStub: IAuthService = sinon.stubInterface<IAuthService>();

  const contextServiceStub: IContextService = sinon.stubInterface<IContextService>();
  const validateUserStub: IValidateUser<Merchant, MerchantDocument> =
    sinon.stubInterface<IValidateUser<Merchant, MerchantDocument>>();

  const merchantService = new MerchantService(
    merchantRepositoryStub,
    merchantMapperStub,
    contextServiceStub,
    authServiceStub,
    validateUserStub,
  );

  const merchantId = new Types.ObjectId();

  it('Should not create a Merchant, should throw an exception instead', async () => {
    try {
      const createMerchantProps = {
        email: 'ola@tesla.com',
        passwordHash: '',
      };
      validateUserStub.getUser = async (): Promise<any | undefined> => {
        return merchantMockData;
      };
      contextServiceStub.getContext = (): Promise<Context> => {
        return Promise.resolve(new Context(createMerchantProps.email, ''));
      };
      merchantRepositoryStub.findOne = async (): Promise<Result<Merchant>> => {
        return merchantMockData;
      };
      merchantRepositoryStub.find = async (): Promise<Result<Merchant[]>> => {
        return Result.ok(merchantMockDatas);
      };
      await merchantService.createMerchant(createMerchantProps);
    } catch (error: any) {
      expect(error.status).to.eq(400);
      expect(error.response.error).to.eq('Merchant with email ola@tesla.com already exists');
    }
  });

  it('Should create a Merchant', async () => {
    const createMerchantProps = {
      email: 'ola@ola.com',
      passwordHash: '',
    };
    contextServiceStub.getContext = (): Promise<Context> => {
      return Promise.resolve(new Context(createMerchantProps.email, ''));
    };
    Audit.createInsertContext = (): Audit => {
      return Audit.create(auditMockData).getValue();
    };
    merchantRepositoryStub.findOne = async (): Promise<Result<Merchant>> => {
      return merchantMockData;
    };
    merchantRepositoryStub.create = async (): Promise<Result<Merchant>> => {
      return merchantMockData;
    };
    const response = {
      id: merchantId,
      ...merchantMockData.getValue(),
      ...auditMockData,
    };
    MerchantParser.createMerchantResponse = (): any => {
      return response;
    };
    const result = await merchantService.createMerchant(createMerchantProps);
    expect(result).to.not.be.undefined;
    expect(result.isSuccess).to.be.true;
  });

  it('Should get a merchant by Id', async () => {
    contextServiceStub.getContext = (): Promise<Context> => {
      return Promise.resolve(new Context('ola@tesla.com', ''));
    };
    validateUserStub.getUser = async (): Promise<any | undefined> => {
      return merchantMockData;
    };
    merchantRepositoryStub.findById = async (): Promise<Result<Merchant>> => {
      return merchantMockData;
    };
    const result = await merchantService.getMerchantById(merchantId);
    expect(result).to.not.be.undefined;
    expect(result.isSuccess).to.be.true;
  });

  it('Should hash a password', async () => {
    authServiceStub.hashData = async (): Promise<string> => {
      return '';
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await merchantService.hashPassword('', 10);
    expect(result).to.not.be.undefined;
  });

  it('Should not sign a merchant in and should throw an exception', async () => {
    try {
      const loginProps = { email: 'ola@ola.com', password: '' };
      merchantRepositoryStub.findOne = async (): Promise<Result<Merchant>> => {
        return merchantMockData;
      };

      await merchantService.signIn(loginProps);
    } catch (error: any) {
      expect(error.response.error).to.eq('Incorrect Username or Password');
    }
  });

  it('Should OnBoard a Merchant', async () => {
    const props = {
      firstName: 'ola',
      lastName: 'Ola',
      organisationName: 'Twitter',
      phoneNumber: '23456',
      organisationAddress: 'California',
      refreshTokenHash: '1234567',
      auditModifiedBy: 'Ola@gmail.com',
      auditModifiedDateTime: new Date().toString(),
    };
    validateUserStub.getUser = async (): Promise<any | undefined> => {
      return merchantMockData;
    };
    merchantRepositoryStub.findById = async (): Promise<Result<Merchant>> => {
      return merchantMockData;
    };
    contextServiceStub.getContext = (): Promise<Context> => {
      return Promise.resolve(new Context(merchantMockData.getValue().email, '1234567890'));
    };
    merchantRepositoryStub.findOneAndUpdate = async (): Promise<Result<Merchant>> => {
      return merchantMockData;
    };
    const result: Result<IMerchantResponseDTO> = await merchantService.onBoardMerchant(props, merchantId);
    expect(result.isSuccess).to.be.true;
  });
});
