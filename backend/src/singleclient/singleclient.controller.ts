import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';
import { GetCurrentUserId } from '../infrastructure/decorators/get-user-id.decorator';
import { GetCurrentUser } from '../infrastructure/decorators/get-user.decorator';
import { TYPES } from '../application/constants/types';
import { Result } from '../domain/result/result';
import { AccessAuthGuard } from '../infrastructure/guards/access-auth.guard';
import { RefreshAuthGuard } from '../infrastructure/guards/refresh-auth.guard';
import { CreateSingleClientDTO, LoginSingleClientDTO, OnBoardSingleClientDTO } from './dtos';
import { ISingleClientService } from './interface/singleclient-service.interface';
import { ISingleClientResponseDTO } from './singleclient-response.dto';
import { RoleGuard } from 'src/infrastructure/guards/role-guard';
import { Roles } from 'src/infrastructure';
import { Role } from 'src/application';

@Controller('singleclients')
export class SingleClientController {
  constructor(@Inject(TYPES.ISingleClientService) private readonly singleclientService: ISingleClientService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() request: CreateSingleClientDTO): Promise<Result<ISingleClientResponseDTO>> {
    return this.singleclientService.createSingleClient(request);
  }

  @UseGuards(AccessAuthGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') singleclientId: Types.ObjectId): Promise<Result<ISingleClientResponseDTO>> {
    return this.singleclientService.getSingleClientById(singleclientId);
  }

  @UseGuards(AccessAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getSingleClients(): Promise<Result<ISingleClientResponseDTO[]>> {
    return this.singleclientService.getSingleClients();
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async login(@Body() request: LoginSingleClientDTO): Promise<Result<ISingleClientResponseDTO>> {
    return this.singleclientService.signIn(request);
  }

  @UseGuards(AccessAuthGuard)
  @Patch('/onboarding')
  @HttpCode(HttpStatus.CREATED)
  async onBoard(
    @Body() request: OnBoardSingleClientDTO,
    @GetCurrentUserId() userId: Types.ObjectId,
  ): Promise<Result<ISingleClientResponseDTO>> {
    return this.singleclientService.onBoardSingleClient(request, userId);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('/refresh')
  async refresh(@GetCurrentUser() singleclient: any): Promise<Result<{ accessToken: string }>> {
    return this.singleclientService.getAccessTokenAndUpdateRefreshToken(singleclient.sub, singleclient.token);
  }

  @UseGuards(AccessAuthGuard)
  @Post('/logout')
  async logOut(@GetCurrentUserId() userId: Types.ObjectId) {
    return this.singleclientService.signOut(userId);
  }
}
