import { Result } from './../domain/result/result';
import { ISignUpTokens } from './../infrastructure/auth/interfaces/auth.interface';
import { expect } from 'chai';
import { Types } from 'mongoose';
import * as sinon from 'ts-sinon';
import { auditMockData } from './../audit/audit-mock-data';
import { AuditMapper } from './../audit/audit.mapper';
import { Audit } from './../domain/audit/audit';
import { IAuthService } from './../infrastructure/auth/interfaces/auth-service.interface';
import { MerchantRepository } from './../infrastructure/data_access/repositories/merchant-repository';
import { MerchantDocument } from './../infrastructure/data_access/repositories/schemas/merchant.schema';
import { Merchant } from './merchant';
import { merchantMockData } from './merchant-mock-data';
import { MerchantParser } from './merchant-parser';
import { IMerchantResponseDTO } from './merchant-response.dto';
import { MerchantMapper } from './merchant.mapper';
import { MerchantService } from './merchant.service';
import * as bcrypt from 'bcrypt';

describe('Test merchant service', () => {
  const merchantRepositoryStub: MerchantRepository =
    sinon.stubInterface<MerchantRepository>();

  const merchantMapperStub: MerchantMapper = new MerchantMapper(
    new AuditMapper(),
  );
  const authServiceStub: IAuthService = sinon.stubInterface<IAuthService>();

  const merchantService = new MerchantService(
    merchantRepositoryStub,
    merchantMapperStub,
    authServiceStub,
  );

  const merchant: Merchant = Merchant.create(merchantMockData).getValue();

  const merchantId = new Types.ObjectId();
  const mockPassword = 'kjwer849504jdf';

  it('Should not create a Merchant, should throw an exception instead', async () => {
    try {
      const createMerchantProps = {
        email: 'ola@tesla.com',
        passwordHash: mockPassword,
      };
      merchantRepositoryStub.find = async (): Promise<MerchantDocument[]> => {
        return [merchantMockData];
      };
      await merchantService.createMerchant(createMerchantProps);
    } catch (error) {
      expect(error.status).to.eq(400);
      expect(error.response.error).to.eq(
        'Restaurant with email ola@tesla.com already exists',
      );
    }
  });

  it('Should create a Merchant', async () => {
    const createMerchantProps = {
      email: 'ola@ola.com',
      passwordHash: 'mockPassword',
    };
    Audit.createInsertContext = (): Audit => {
      return Audit.create(auditMockData).getValue();
    };
    merchantRepositoryStub.create = async (): Promise<MerchantDocument> => {
      return merchantMockData;
    };
    const response = {
      id: merchantId,
      ...merchantMockData,
      ...auditMockData,
    };
    MerchantParser.createMerchantResponse = (): IMerchantResponseDTO => {
      return response;
    };
    const result = await merchantService.createMerchant(createMerchantProps);
    expect(result).to.not.be.undefined;
    expect(result.isSuccess).to.be.true;
  });

  it('Should get a merchant by Id', async () => {
    merchantRepositoryStub.findById = async (): Promise<MerchantDocument> => {
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
    const result = await merchantService.hashPassword(mockPassword, 10);
    expect(result).to.not.be.undefined;
  });

  it('should update merchant refresh token', async () => {
    const hash = '123456jksldfn548762hnjmkcm';
    authServiceStub.hashData = async (): Promise<string> => {
      return hash;
    };
    const token = { refreshToken: '', accessToken: '' };
    merchantRepositoryStub.findOneAndUpdate =
      async (): Promise<MerchantDocument> => {
        return { ...merchantMockData, refreshTokenHash: hash };
      };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result: Merchant = await merchantService.updateUserRefreshToken(
      merchant,
      token,
    );
    expect(result.refreshTokenHash).to.eq(hash);
  });

  it('Should not sign a merchant in and should throw an exception', async () => {
    try {
      const loginProps = { email: 'ola@ola.com', password: '' };
      merchantRepositoryStub.findOne = async (): Promise<MerchantDocument> => {
        return merchantMockData;
      };

      await merchantService.signIn(loginProps);
    } catch (error) {
      expect(error.response.error).to.eq('InCorrect Username or Password');
    }
  });

  it('Should sign a merchant in', async () => {
    const loginProps = {
      email: 'ola@ola.com',
      password: '2345678uhbnewnjdk',
    };
    const hashPassword = await bcrypt.hash(loginProps.password, 10);
    merchantRepositoryStub.findOne = async (): Promise<MerchantDocument> => {
      return { ...merchantMockData, passwordHash: hashPassword };
    };
    const tokens = {
      refreshToken: '',
      accessToken: '',
    };
    authServiceStub.generateAuthTokens = async (): Promise<ISignUpTokens> => {
      return tokens;
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await merchantService.updateUserRefreshToken(merchant, tokens);
    const result = await merchantService.signIn(loginProps);
    expect(result).to.not.be.undefined;
  });

  it('Should not Onboard an existing Merchant and should throw an exception', async () => {
    try {
      const props = {
        firstName: 'ola',
        lastName: 'Ola',
        email: 'ola@gmail.com',
        organisationName: 'Tesla',
        phoneNumber: '23456',
        organisationAddress: 'California',
        refreshTokenHash: '1234567',
      };
      merchantRepositoryStub.findById = async (): Promise<MerchantDocument> => {
        return merchantMockData;
      };
      await merchantService.onBoardMerchant(props, merchantId);
    } catch (error) {
      expect(error.response.error).to.eq('Merchant has been boarded');
    }
  });

  it('Should not OnBoard a Merchant', async () => {
    const props = {
      firstName: 'ola',
      lastName: 'Ola',
      organisationName: 'Twitter',
      phoneNumber: '23456',
      organisationAddress: 'California',
      refreshTokenHash: '1234567',
    };
    merchantRepositoryStub.findById = async (): Promise<MerchantDocument> => {
      return { ...merchantMockData, organisationName: '' };
    };
    merchantRepositoryStub.findOneAndUpdate =
      async (): Promise<MerchantDocument> => {
        return { ...merchantMockData, ...props };
      };
    const result: Result<IMerchantResponseDTO> =
      await merchantService.onBoardMerchant(props, merchantId);
    expect(result.isSuccess).to.be.true;
  });
});
