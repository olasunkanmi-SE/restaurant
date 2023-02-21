import { Category } from './../category/category';
import { CategoryRepository } from './../infrastructure/data_access/repositories/category.repository';
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
  private context: Context;
  constructor(
    @Inject(TYPES.IContextService)
    private readonly contextService: IContextService,
    @Inject(TYPES.IMerchantService) private readonly merchantService: IMerchantService,
    private readonly categoryRepository: CategoryRepository,
    private readonly addonRepository: AddonRepository,
    private readonly addonMapper: AddonMapper,
  ) {
    this.context = this.contextService.getContext();
  }

  async createAddon(props: CreateAddonDTO): Promise<Result<IAddonResponseDTO>> {
    const { name } = props;
    await this.merchantService.validateContext();
    const existingItem = await this.addonRepository.findOne({ name });
    if (existingItem.isSuccess) {
      throwApplicationError(HttpStatus.BAD_REQUEST, `Item ${name} already exists`);
    }
    const context: Context = await this.context;
    const audit: Audit = Audit.createInsertContext(context);
    const categoryResult: Result<Category> = await this.categoryRepository.findById(props.categoryId);
    if (!categoryResult.isSuccess) {
      throwApplicationError(HttpStatus.NOT_FOUND, 'category does not exist');
    }
    const category = categoryResult.getValue();
    const addon: Addon = Addon.create({ ...props, audit, category });
    const addonModel: AddonDataModel = this.addonMapper.toPersistence(addon);
    const result: Result<Addon> = await this.addonRepository.create(addonModel);
    if (!result.isSuccess) {
      throwApplicationError(HttpStatus.SERVICE_UNAVAILABLE, 'Error while creating addon, please try again later');
    }
    const addonDoc = await this.addonRepository.getAddonWithCategory(result.getValue().id);
    const newAddon = this.addonMapper.toDomain(addonDoc);
    const addonResponse = AddonParser.createAddonResponse(newAddon);
    return Result.ok(addonResponse);
  }

  async getAddons(): Promise<Result<IAddonResponseDTO[]>> {
    await this.merchantService.validateContext();
    const addonsDoc = await this.addonRepository.getAddons();
    const addons: Addon[] = addonsDoc.map((addon) => this.addonMapper.toDomain(addon));
    const response: IAddonResponseDTO[] = AddonParser.createAddonsResponse(addons);
    return Result.ok(response);
  }
}
