import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { TYPES } from './../application/constants/types';
import { Result } from './../domain/result/result';
import { AccessAuthGuard } from './../infrastructure/guards/access-auth.guard';
import { ConvertId } from './../utils/mongoose-id-conversion';
import { LoginMerchantDTO } from './dtos';
import { CreateMerchantDTO } from './dtos/create-merchant.dto';
import { OnBoardMerchantDTO } from './dtos/on-board-merchant.dto';
import { IMerchantService } from './interface/merchant-service.interface';
import { IMerchantResponseDTO } from './merchant-response.dto';

@Controller('merchants')
export class MerchantController {
  constructor(
    @Inject(TYPES.IMerchantService)
    private readonly merchantService: IMerchantService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() request: CreateMerchantDTO,
  ): Promise<Result<IMerchantResponseDTO>> {
    return this.merchantService.createMerchant(request);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id') merchantId: Types.ObjectId,
  ): Promise<Result<IMerchantResponseDTO>> {
    return this.merchantService.getMerchantById(merchantId);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() request: LoginMerchantDTO,
  ): Promise<Result<IMerchantResponseDTO>> {
    return this.merchantService.signIn(request);
  }

  @UseGuards(AccessAuthGuard)
  @Post('/onboarding')
  @HttpCode(HttpStatus.CREATED)
  async onBoard(
    @Body() request: OnBoardMerchantDTO,
  ): Promise<Result<IMerchantResponseDTO>> {
    return this.merchantService.onBoardMerchant(
      request,
      ConvertId.convertStringToObjectId('63636353885a6f18f06f78c1'),
    );
  }
}
