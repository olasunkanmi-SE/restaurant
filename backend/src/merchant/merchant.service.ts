import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
import { Merchant } from './../merchant/merchant';
import { CreateMerchantDTO } from './create-merchant.dto';
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

    let tokens: ISignUpTokens;
    if (newMerchantDoc) {
      const { id, email, role } = newMerchantDoc;
      const props: IUserPayload = { userId: id, email, role };
      tokens = await this.authService.generateAuthTokens(props);
    }
    const newMerchant: Merchant = this.merchantMapper.toDomain(newMerchantDoc);
    this.updateUserRefreshToken(newMerchant, tokens);
    const parsedResponse = MerchantParser.createMerchantResponse(newMerchant);
    parsedResponse.tokens = tokens;
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
}
