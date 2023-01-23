import { IAddonService } from './addon-service.interface';
import { IAddonResponseDTO } from './addon-response.dto';
import { Result } from './../domain/result/result';
import { CreateAddonDTO } from './create-addon.dto';
import { TYPES } from '../application';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

@Controller('addons')
export class AddonController {
  constructor(@Inject(TYPES.IAddonService) private readonly addonService: IAddonService) {}

  @Post()
  async createAddon(@Body() request: CreateAddonDTO): Promise<Result<IAddonResponseDTO>> {
    return await this.addonService.createAddon(request);
  }

  @Get()
  async getAddons(): Promise<Result<IAddonResponseDTO[]>> {
    return await this.addonService.getAddons();
  }
}
