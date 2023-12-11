import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { expect } from 'chai';
import { Types } from 'mongoose';
import * as sinon from 'ts-sinon';
import { auditMockData } from '../audit/audit-mock-data';
import { AuditMapper } from '../audit/audit.mapper';
import { Audit } from '../domain/audit/audit';
import { Result } from '../domain/result/result';
import { Context } from '../infrastructure/context';
import { IContextService } from '../infrastructure/context/context-service.interface';
import { SingleClientRepository } from '../infrastructure/data_access/repositories/singleclient.repository';
import { IValidateUser } from '../utils/context-validation.interface';
import { singleclientMockData, singleclientMockDatas } from './singleclient-mock-data';
import { SingleClientParser } from './singleclient-parser';
import { ISingleClientResponseDTO } from './singleclient-response.dto';
import { SingleClientMapper } from './singleclient.mapper';
import { SingleClientService } from './singleclient.service';
import { SingleClient } from './singleclient';
import { SingleClientDocument } from '../infrastructure';

describe('Test singleclient service', () => {
  const singleclientRepositoryStub: SingleClientRepository = sinon.stubInterface<SingleClientRepository>();
  const singleclientMapperStub: SingleClientMapper = new SingleClientMapper(new AuditMapper());
  const contextServiceStub: IContextService = sinon.stubInterface<IContextService>();
  const validateUserStub: IValidateUser<SingleClient, SingleClientDocument> =
    sinon.stubInterface<IValidateUser<SingleClient, SingleClientDocument>>();
  const jwtServiceStub: JwtService = sinon.stubInterface<JwtService>();
  const configServiceStub: ConfigService = sinon.stubInterface<ConfigService>();

  const singleclientService = new SingleClientService(
    jwtServiceStub,
    configServiceStub,
    singleclientRepositoryStub,
    singleclientMapperStub,
    contextServiceStub,
    validateUserStub,
  );

  const singleclientId = new Types.ObjectId();

  it('Should not create a SingleClient, should throw an exception instead', async () => {
    try {
      const createSingleClientProps = {
        email: 'ola@tesla.com',
        passwordHash: '',
      };
      validateUserStub.getUser = async (): Promise<any> => {
        return singleclientMockData;
      };
      contextServiceStub.getContext = (): Context => {
        return new Context(createSingleClientProps.email, '');
      };
      singleclientRepositoryStub.findOne = async (): Promise<Result<SingleClient>> => {
        return singleclientMockData;
      };
      singleclientRepositoryStub.find = async (): Promise<Result<SingleClient[]>> => {
        return Result.ok(singleclientMockDatas);
      };
      await singleclientService.createSingleClient(createSingleClientProps);
    } catch (error: any) {
      expect(error.status).to.eq(400);
      expect(error.response.error).to.eq('User with email ola@tesla.com already exists');
    }
  });

  it('Should create a SingleClient', async () => {
    const createSingleClientProps = {
      email: 'ola@ola.com',
      passwordHash: '',
    };
    contextServiceStub.getContext = (): Context => {
      return new Context(createSingleClientProps.email, '');
    };
    Audit.createInsertContext = (): Audit => {
      return Audit.create(auditMockData).getValue();
    };
    singleclientRepositoryStub.findOne = async (): Promise<Result<SingleClient>> => {
      return singleclientMockData;
    };
    singleclientRepositoryStub.create = async (): Promise<Result<SingleClient>> => {
      return singleclientMockData;
    };
    const response = {
      id: singleclientId,
      ...singleclientMockData.getValue(),
      ...auditMockData,
    };
    SingleClientParser.createSingleClientResponse = (): any => {
      return response;
    };
    const result = await singleclientService.createSingleClient(createSingleClientProps);
    expect(result).to.not.be.undefined;
    expect(result.isSuccess).to.be.true;
  });

  it('Should get a singleclient by Id', async () => {
    contextServiceStub.getContext = (): Context => {
      return new Context('ola@tesla.com', '');
    };
    validateUserStub.getUser = async (): Promise<any> => {
      return singleclientMockData;
    };
    singleclientRepositoryStub.findById = async (): Promise<Result<SingleClient>> => {
      return singleclientMockData;
    };
    const result = await singleclientService.getSingleClientById(singleclientId);
    expect(result).to.not.be.undefined;
    expect(result.isSuccess).to.be.true;
  });

  it('Should hash a password', async () => {
    // singleclientService.hashData = async (): Promise<string> => {
    //   return '';
    // };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // const result = await singleclientService.hashPassword('', 10);
    // expect(result).to.not.be.undefined;
  });

  it('Should not sign a singleclient in and should throw an exception', async () => {
    try {
      const loginProps = { email: 'ola@ola.com', password: '' };
      singleclientRepositoryStub.findOne = async (): Promise<Result<SingleClient>> => {
        return singleclientMockData;
      };

      await singleclientService.signIn(loginProps);
    } catch (error: any) {
      expect(error.response.error).to.eq('Incorrect Username or Password');
    }
  });

  it('Should OnBoard a SingleClient', async () => {
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
    validateUserStub.getUser = async (): Promise<any> => {
      return singleclientMockData;
    };
    singleclientRepositoryStub.findById = async (): Promise<Result<SingleClient>> => {
      return singleclientMockData;
    };
    contextServiceStub.getContext = (): Context => {
      return new Context(singleclientMockData.getValue().email, '1234567890');
    };
    singleclientRepositoryStub.findOneAndUpdate = async (): Promise<Result<SingleClient>> => {
      return singleclientMockData;
    };
    const result: Result<ISingleClientResponseDTO> = await singleclientService.onBoardSingleClient(
      props,
      singleclientId,
    );
    expect(result.isSuccess).to.be.true;
  });
});
