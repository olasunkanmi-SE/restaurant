import { ConvertId } from './../utils/mongoose-id-conversion';
import { Result } from './../domain/result/result';
import { IMerchantResponseDTO } from './merchant-response.dto';
import { CreateMerchantDTO } from './dtos/create-merchant.dto';
import { TYPES } from './../application/constants/types';
import { IMerchantService } from './merchant-service.interface';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { LoginMerchantDTO } from './dtos';
import { OnBoardMerchantDTO } from './dtos/on-board-merchant.dto';

@Controller('merchants')
export class MerchantController {
  constructor(
    @Inject(TYPES.IMerchantService)
    private readonly merchantService: IMerchantService,
  ) {}

  @Post()
  async create(
    @Body() request: CreateMerchantDTO,
  ): Promise<Result<IMerchantResponseDTO>> {
    return this.merchantService.createMerchant(request);
  }

  @Get('/:id')
  async getById(
    @Param('id') merchantId: Types.ObjectId,
  ): Promise<Result<IMerchantResponseDTO>> {
    return this.merchantService.getMerchantById(merchantId);
  }

  @Post('/signin')
  async login(
    @Body() request: LoginMerchantDTO,
  ): Promise<Result<IMerchantResponseDTO>> {
    return this.merchantService.signIn(request);
  }

  @Post('/onboarding')
  async onBoard(
    @Body() request: OnBoardMerchantDTO,
  ): Promise<Result<IMerchantResponseDTO>> {
    return this.merchantService.onBoardMerchant(
      request,
      ConvertId.convertStringToObjectId('63636353885a6f18f06f78c1'),
    );
  }
}
