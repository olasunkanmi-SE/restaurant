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
import { GetCurrentUserId } from 'src/infrastructure/decorators/get-user-id.decorator';
import { GetCurrentUser } from 'src/infrastructure/decorators/get-user.decorator';
import { TYPES } from './../application/constants/types';
import { Result } from './../domain/result/result';
import { AccessAuthGuard } from './../infrastructure/guards/access-auth.guard';
import { RefreshAuthGuard } from './../infrastructure/guards/refresh-auth.guard';
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
    @GetCurrentUserId() userId: Types.ObjectId,
  ): Promise<Result<IMerchantResponseDTO>> {
    return this.merchantService.onBoardMerchant(request, userId);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('/refresh')
  async refresh(
    @GetCurrentUser() merchant: any,
  ): Promise<Result<{ accessToken: string }>> {
    return this.merchantService.getAccessTokenAndUpdateRefreshToken(
      merchant.sub,
      merchant.token,
    );
  }
}
