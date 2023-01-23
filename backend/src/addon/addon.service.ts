import { IAddonResponseDTO } from './addon-response.dto';
import { AddonParser } from './addon.parser';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TYPES } from '../application';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { Context } from './../infrastructure/context/context';
import { IContextService } from './../infrastructure/context/context-service.interface';
import { AddonRepository } from './../infrastructure/data_access/repositories/addon.repository';
import { throwApplicationError } from './../infrastructure/utilities/exception-instance';
import { IMerchantService } from './../merchant/interface/merchant-service.interface';
import { Addon } from './addon';
import { IAddonService } from './addon-service.interface';
import { AddonMapper } from './addon.mapper';
import { AddonDataModel } from './addon.schema';
import { CreateAddonDTO } from './create-addon.dto';

@Injectable()
export class AddonService implements IAddonService {
  private context: Promise<Context>;
  constructor(
    @Inject(TYPES.IContextService)
    private readonly contextService: IContextService,
    @Inject(TYPES.IMerchantService) private readonly merchantService: IMerchantService,
    private readonly addonRepository: AddonRepository,
    private readonly addonMapper: AddonMapper,
  ) {
    this.context = this.contextService.getContext();
  }

  async createAddon(props: CreateAddonDTO): Promise<Result<IAddonResponseDTO>> {
    const { name } = props;
    const validUser: boolean = await this.merchantService.validateContext();
    if (!validUser) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid Email');
    }

    const existingItem = await this.addonRepository.findOne({ name });
    if (existingItem.isSuccess) {
      throwApplicationError(HttpStatus.BAD_REQUEST, `Item ${name} already exists`);
    }
    const context: Context = await this.context;
    const audit: Audit = Audit.createInsertContext(context);
    const addon: Addon = Addon.create({ ...props, code: props.code.toUpperCase(), audit });
    const addonModel: AddonDataModel = this.addonMapper.toPersistence(addon);
    const result: Result<Addon> = await this.addonRepository.create(addonModel);
    if (!result.isSuccess) {
      throwApplicationError(HttpStatus.SERVICE_UNAVAILABLE, 'Error while creating addon, please try again later');
    }
    const newAddon = result.getValue();
    const addonResponse = AddonParser.createAddonResponse(newAddon);
    return Result.ok(addonResponse);
  }

  async getAddons(): Promise<Result<IAddonResponseDTO[]>> {
    const validUser: boolean = await this.merchantService.validateContext();
    if (!validUser) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid Email');
    }
    const result: Result<Addon[]> = await this.addonRepository.find({});
    const addons: Addon[] = result.getValue();
    const response: IAddonResponseDTO[] = AddonParser.createAddonsResponse(addons);
    return Result.ok(response);
  }
}
