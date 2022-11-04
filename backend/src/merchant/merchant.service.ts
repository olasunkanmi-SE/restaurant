import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { saltRounds } from './../application/constants/constants';
import { TYPES } from './../application/constants/types';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { IAuthService } from './../infrastructure/auth/interfaces/auth-service.interface';
import {
  ISignUpTokens,
  IUserPayload,
} from './../infrastructure/auth/interfaces/auth.interface';
import { MerchantRepository } from './../infrastructure/data_access/repositories/merchant-repository';
import { MerchantDocument } from './../infrastructure/data_access/repositories/schemas/merchant.schema';
import { throwApplicationError } from './../infrastructure/utilities/exception-instance';
import { Merchant } from './../merchant/merchant';
import {
  CreateMerchantDTO,
  LoginMerchantDTO,
  OnBoardMerchantDTO,
} from './dtos';

import { MerchantParser } from './merchant-parser';
import { IMerchantResponseDTO } from './merchant-response.dto';
import { IMerchantService } from './merchant-service.interface';
import { MerchantMapper } from './merchant.mapper';

@Injectable()
export class MerchantService implements IMerchantService {
  constructor(
    private readonly merchantRepository: MerchantRepository,
    private readonly merchantMapper: MerchantMapper,
    @Inject(TYPES.IAuthService) private readonly authService: IAuthService,
  ) {}

  async createMerchant(
    props: CreateMerchantDTO,
  ): Promise<Result<IMerchantResponseDTO>> {
    const merchantDocuments: MerchantDocument[] =
      await this.merchantRepository.find({});
    const existingMerchant = merchantDocuments.find(
      (merchant) => merchant.email === props.email,
    );
    if (existingMerchant) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Restaurant with email ${props.email} already exists`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const audit: Audit = Audit.createInsertContext();
    const hashedPassword = await this.hashPassword(props.passwordHash);
    const merchant: Merchant = Merchant.create({
      ...props,
      passwordHash: hashedPassword,
      audit,
    }).getValue();

    const newMerchantDoc = await this.merchantRepository.create(
      this.merchantMapper.toPersistence(merchant),
    );

    const parsedResponse = MerchantParser.createMerchantResponse(
      this.merchantMapper.toDomain(newMerchantDoc),
    );
    return Result.ok(parsedResponse);
  }

  async getMerchantById(
    id: Types.ObjectId,
  ): Promise<Result<IMerchantResponseDTO>> {
    const merchantDoc = await this.merchantRepository.findById(id);
    return Result.ok(
      MerchantParser.createMerchantResponse(
        this.merchantMapper.toDomain(merchantDoc),
      ),
    );
  }

  private async hashPassword(password: string): Promise<string> {
    return this.authService.hashData(password, saltRounds);
  }

  private async updateUserRefreshToken(
    merchant: Merchant,
    token: ISignUpTokens,
  ): Promise<Merchant> {
    const hash = await this.authService.hashData(
      token.refreshToken,
      saltRounds,
    );
    const merchantDoc: MerchantDocument =
      await this.merchantRepository.findOneAndUpdate(
        { _id: merchant.id },
        { refreshTokenHash: hash },
      );
    return this.merchantMapper.toDomain(merchantDoc);
  }

  async signIn(props: LoginMerchantDTO): Promise<Result<IMerchantResponseDTO>> {
    const merchantDoc: MerchantDocument = await this.merchantRepository.findOne(
      {
        email: props.email,
      },
    );
    const comparePassWord: boolean = await bcrypt.compare(
      props.password,
      merchantDoc.passwordHash,
    );
    if (!comparePassWord) {
      throwApplicationError(400, 'InCorrect Username or Password');
    }
    const { id, email, role } = merchantDoc;
    const userProps: IUserPayload = { userId: id, email, role };
    const tokens = await this.authService.generateAuthTokens(userProps);
    const merchant: Merchant = this.merchantMapper.toDomain(merchantDoc);
    this.updateUserRefreshToken(merchant, tokens);
    const parsedResponse = MerchantParser.createMerchantResponse(merchant);
    parsedResponse.tokens = tokens;
    return Result.ok(parsedResponse);
  }

  async onBoardMerchant(
    props: OnBoardMerchantDTO,
    id: Types.ObjectId,
  ): Promise<Result<IMerchantResponseDTO>> {
    const merchantDoc: MerchantDocument =
      await this.merchantRepository.findById(id);
    if (merchantDoc.organisationName) {
      throwApplicationError(
        HttpStatus.BAD_REQUEST,
        'Merchant has been boarded',
      );
    }
    const merchant: Merchant = this.merchantMapper.toDomain(merchantDoc);
    const {
      firstName,
      lastName,
      organisationAddress,
      organisationName,
      phoneNumber,
    } = props;

    for (const [key] of Object.entries(props)) {
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

    const updatedMerchantDoc: MerchantDocument =
      await this.merchantRepository.findOneAndUpdate(
        { _id: merchant.id },
        props,
      );
    const updateMerchant: Merchant =
      this.merchantMapper.toDomain(updatedMerchantDoc);
    const parsedResponse =
      MerchantParser.createMerchantResponse(updateMerchant);
    return Result.ok(parsedResponse);
  }
}
