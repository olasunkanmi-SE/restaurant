import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
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

  // async signUp(props: CreateMerchantDTO): Promise<ISignUpTokens> {}

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
    const newMerchant = await this.merchantRepository.create(
      this.merchantMapper.toPersistence(merchant),
    );

    let tokens: ISignUpTokens;
    if (newMerchant) {
      const { id, email, role } = newMerchant;
      const props: IUserPayload = { userId: id, email, role };
      tokens = await this.authService.generateAuthTokens(props);
    }

    const parsedResponse = MerchantParser.createMerchantResponse(
      this.merchantMapper.toDomain(newMerchant),
    );
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
    return bcrypt.hash(password, 10);
  }
}
