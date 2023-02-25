import { AuthService } from './../infrastructure/auth/auth.service';
import {
  MerchantDataModel,
  MerchantDocument,
} from './../infrastructure/data_access/repositories/schemas/merchant.schema';
/* eslint-disable prettier/prettier */
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { MerchantRepository } from '../infrastructure/data_access/repositories/merchant.repository';
import { MerchantStatus, saltRounds } from './../application/constants/constants';
import { TYPES } from './../application/constants/types';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { ISignUpTokens, IUserPayload } from './../infrastructure/auth/interfaces/auth.interface';
import { Context, IContextService } from './../infrastructure/context';
import { GenericDocumentRepository } from './../infrastructure/database';
import { throwApplicationError } from './../infrastructure/utilities/exception-instance';
import { Merchant } from './../merchant/merchant';
import { IValidateUser } from './../utils/context-validation.interface';
import { CreateMerchantDTO, LoginMerchantDTO, OnBoardMerchantDTO } from './dtos';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IMerchantService } from './interface/merchant-service.interface';
import { IUpdateMerchant } from './interface/update-merchant.interface';
import { MerchantParser } from './merchant-parser';
import { IMerchantResponseDTO, IMerchantSignedInResponseDTO } from './merchant-response.dto';
import { MerchantMapper } from './merchant.mapper';

@Injectable()
export class MerchantService extends AuthService implements IMerchantService {
  constructor(
    jwtService: JwtService,
    configService: ConfigService,
    private readonly merchantRepository: MerchantRepository,
    private readonly merchantMapper: MerchantMapper,
    @Inject(TYPES.IContextService)
    private readonly contextService: IContextService,
    @Inject(TYPES.IValidateUser) private readonly validateMerchant: IValidateUser<Merchant, MerchantDocument>,
  ) {
    super(jwtService, configService);
  }

  async createMerchant(props: CreateMerchantDTO): Promise<Result<IMerchantResponseDTO>> {
    const context: Context = new Context(props.email);
    const { email } = props;
    const existingMerchant: Result<Merchant> = await this.merchantRepository.findOne({ email });
    if (existingMerchant.isSuccess && existingMerchant.getValue().email === email) {
      throwApplicationError(HttpStatus.BAD_REQUEST, `Merchant with email ${props.email} already exists`);
    }

    const audit: Audit = Audit.createInsertContext(context);
    const hashedPassword = await this.hashData(props.passwordHash, saltRounds);
    const merchant: Merchant = Merchant.create({
      ...props,
      passwordHash: hashedPassword,
      audit,
    }).getValue();
    const merchantModel: MerchantDataModel = this.merchantMapper.toPersistence(merchant);
    const docResult = await this.merchantRepository.create(merchantModel);
    if (!docResult.isSuccess) {
      throwApplicationError(HttpStatus.SERVICE_UNAVAILABLE, 'Error while creating merchant');
    }

    const newMerchant = docResult.getValue();
    return Result.ok(MerchantParser.createMerchantResponse(newMerchant));
  }

  async getMerchantById(id: Types.ObjectId): Promise<Result<IMerchantResponseDTO>> {
    const context: Context = this.contextService.getContext();
    const isValidUser = await this.validateContext();
    if (!isValidUser) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid Email');
    }
    const result = await this.merchantRepository.findById(id);
    if (!result.isSuccess) {
      throwApplicationError(HttpStatus.NOT_FOUND, 'Merchant does not exist');
    }
    const merchant: Merchant = result.getValue();
    if (context.email !== merchant.email) {
      throwApplicationError(HttpStatus.UNAUTHORIZED, 'You dont have sufficient priviledge');
    }
    return Result.ok(MerchantParser.createMerchantResponse(merchant));
  }

  async getMerchants(): Promise<Result<IMerchantResponseDTO[]>> {
    const isValidUser = await this.validateContext();
    if (!isValidUser) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid Email');
    }
    const result = await this.merchantRepository.find({});
    const merchants = result.getValue();
    return Result.ok(MerchantParser.merchantsResponse(merchants));
  }

  private async updateMerchantRefreshToken(merchant: Merchant, token: ISignUpTokens): Promise<Merchant> {
    const hash = await this.hashData(token.refreshToken, saltRounds);
    const docResult: Result<Merchant> = await this.merchantRepository.findOneAndUpdate(
      { _id: merchant.id },
      { refreshTokenHash: hash },
    );
    if (!docResult.isSuccess) {
      throwApplicationError(HttpStatus.NOT_MODIFIED, 'Merchant could not be updated');
    }
    return docResult.getValue();
  }

  async signIn(props: LoginMerchantDTO): Promise<Result<IMerchantSignedInResponseDTO>> {
    const result: Result<Merchant> = await this.merchantRepository.findOne({
      email: props.email,
    });
    if (!result.isSuccess) {
      throwApplicationError(HttpStatus.NOT_FOUND, 'Merchant does not exist');
    }
    const merchant: Merchant = result.getValue();
    const comparePassWord: boolean = await bcrypt.compare(props.password, merchant.passwordHash);
    if (!comparePassWord) {
      throwApplicationError(400, 'Incorrect Username or Password');
    }
    const { id, email, role } = merchant;
    const userProps: IUserPayload = { userId: id, email, role };
    const tokens = await this.generateAuthTokens(userProps);
    this.updateMerchantRefreshToken(merchant, tokens);
    const parsedResponse = MerchantParser.createMerchantResponse(merchant, tokens, true);
    return Result.ok(parsedResponse);
  }

  async onBoardMerchant(props: OnBoardMerchantDTO, id: Types.ObjectId): Promise<Result<IMerchantResponseDTO>> {
    const context: Context = this.contextService.getContext();
    const isValidUser = await this.validateContext();
    if (!isValidUser) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid Email');
    }
    const result = await this.merchantRepository.findById(id);
    if (!result.isSuccess) {
      throwApplicationError(HttpStatus.NOT_FOUND, 'Merchant does not exist');
    }
    const merchant: Merchant = result.getValue();

    if (context.email !== merchant.email) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid email');
    }

    const data = {
      auditModifiedBy: context.email,
      auditModifiedDateTime: new Date().toISOString(),
      status: MerchantStatus.boarded,
      ...props,
    };

    this.updateMerchantData(data, merchant, context);

    const docResult: Result<Merchant> = await this.merchantRepository.findOneAndUpdate({ _id: merchant.id }, data);
    if (!docResult.isSuccess) {
      throwApplicationError(HttpStatus.NOT_MODIFIED, 'Merchant could not be updated');
    }

    const updatedMerchant: Merchant = docResult.getValue();
    return Result.ok(MerchantParser.createMerchantResponse(updatedMerchant));
  }

  updateMerchantData(data: IUpdateMerchant, merchant: Merchant, context: Context) {
    const { firstName, lastName, organisationAddress, organisationName, phoneNumber } = data;
    for (const [key] of Object.entries(data)) {
      switch (key) {
        case firstName:
          merchant.firstName = firstName;
          break;
        case lastName:
          merchant.lastName = lastName;
          break;
        case organisationAddress:
          merchant.organisationAddress = organisationAddress;
          break;
        case organisationName:
          merchant.organisationName = organisationName;
          break;
        case phoneNumber:
          merchant.phoneNumber = phoneNumber;
          break;
        default:
          break;
      }
    }
    Audit.updateContext(context.email, merchant);
  }

  async getAccessTokenAndUpdateRefreshToken(
    userId: Types.ObjectId,
    refreshToken: string,
  ): Promise<Result<{ accessToken: string }>> {
    const merchantRepo: MerchantRepository = this.merchantRepository;
    const accessToken = await this.refreshMerchantToken(merchantRepo, userId, refreshToken);
    return Result.ok(accessToken);
  }

  private async refreshMerchantToken(
    model: GenericDocumentRepository<any, any>,
    userId: Types.ObjectId,
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    return await this.updateRefreshToken(model, userId, refreshToken);
  }

  private async logOutMerchant(model: GenericDocumentRepository<any, any>, userId: Types.ObjectId): Promise<void> {
    return this.logOut(model, userId);
  }

  async signOut(userId: Types.ObjectId): Promise<void> {
    return this.logOutMerchant(this.merchantRepository, userId);
  }

  /**
   * private method to validate user context
   *
   * @param {GenericDocumentRepository<any>} model
   * @returns {void}
   * @memberof AuthService
   */
  async validateContext(): Promise<boolean> {
    const context: Context = this.contextService.getContext();
    return await this.validateMerchant.getUser(this.merchantRepository, { email: context.email });
  }
}
