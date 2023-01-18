import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IContextService } from '.././infrastructure/context';
import { TYPES } from './../application/constants/types';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { Context } from './../infrastructure/context/context';
import { ITemRepository } from './../infrastructure/data_access/repositories/item.repository';
import { ItemDataModel } from './../infrastructure/data_access/repositories/schemas/item.schema';
import { throwApplicationError } from './../infrastructure/utilities/exception-instance';
import { IMerchantService } from './../merchant/interface/merchant-service.interface';
import { CreateItemDTO } from './create-item-schema';
import { Item } from './item';
import { ITemResponseDTO } from './item-response.dto';
import { IItemService } from './item-service.interface';
import { ItemMapper } from './item.mapper';
import { ItemParser } from './item.parser';

@Injectable()
export class ItemService implements IItemService {
  private context: Promise<Context>;
  constructor(
    @Inject(TYPES.IContextService)
    private readonly contextService: IContextService,
    @Inject(TYPES.IMerchantService) private readonly merchantService: IMerchantService,
    private readonly iTemRepository: ITemRepository,
    private readonly itemMapper: ItemMapper,
  ) {
    this.context = this.contextService.getContext();
  }

  async createItem(props: CreateItemDTO): Promise<Result<ITemResponseDTO>> {
    const { name } = props;
    const validUser: boolean = await this.merchantService.validateContext();
    if (!validUser) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid Email');
    }

    const existingItem = await this.iTemRepository.findOne({ name });
    if (existingItem.isSuccess) {
      throwApplicationError(HttpStatus.BAD_REQUEST, `Item ${name} already exists`);
    }

    const context: Context = await this.context;
    const audit: Audit = Audit.createInsertContext(context);
    const item: Item = Item.create({ ...props, audit }).getValue();
    const itemModel: ItemDataModel = this.itemMapper.toPersistence(item);
    const result: Result<Item> = await this.iTemRepository.create(itemModel);
    if (!result.isSuccess) {
      throwApplicationError(HttpStatus.SERVICE_UNAVAILABLE, 'Error while creating item, please try again later');
    }
    const newItem: Item = result.getValue();
    const requestResponse = ItemParser.createItemResponse(newItem);
    return Result.ok(requestResponse);
  }

  async getItems(): Promise<Result<ITemResponseDTO[]>> {
    const validUser: boolean = await this.merchantService.validateContext();
    if (!validUser) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid Email');
    }
    const result: Result<Item[]> = await this.iTemRepository.find({});
    const items = result.getValue();
    const reponse: ITemResponseDTO[] = ItemParser.createItemsresponse(items);
    return Result.ok(reponse);
  }
}
