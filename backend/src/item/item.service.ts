import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { IContextService } from '.././infrastructure/context';
import { TYPES } from './../application/constants/types';
import { Audit } from './../domain/audit/audit';
import { Result } from './../domain/result/result';
import { Context } from './../infrastructure/context/context';
import { ITemRepository } from './../infrastructure/data_access/repositories/item.repository';
import { ItemDataModel } from './../infrastructure/data_access/repositories/schemas/item.schema';
import { throwApplicationError } from './../infrastructure/utilities/exception-instance';
import { ISingleClientService } from './../singleclient/interface/singleclient-service.interface';
import { CreateItemDTO } from './create-item-schema';
import { Item } from './item';
import { ITemResponseDTO } from './item-response.dto';
import { IItemService } from './item-service.interface';
import { ItemMapper } from './item.mapper';
import { ItemParser } from './item.parser';

@Injectable()
export class ItemService implements IItemService {
  private context: Context;
  constructor(
    @Inject(TYPES.IContextService)
    private readonly contextService: IContextService,
    @Inject(TYPES.ISingleClientService) private readonly singleclientService: ISingleClientService,
    private readonly iTemRepository: ITemRepository,
    private readonly itemMapper: ItemMapper,
  ) {
    this.context = this.contextService.getContext();
  }

  async createItem(props: CreateItemDTO): Promise<Result<ITemResponseDTO>> {
    const { name } = props;
    await this.singleclientService.validateContext();
    const existingItem = await this.iTemRepository.getItem(name);
    if (existingItem.isSuccess) {
      throwApplicationError(HttpStatus.BAD_REQUEST, `Item ${name} already exists`);
    }
    const audit: Audit = Audit.createInsertContext(this.context);
    const item: Item = Item.create({ ...props, audit }).getValue();
    const itemModel: ItemDataModel = this.itemMapper.toPersistence(item);
    const result: Result<Item> = await this.iTemRepository.createItem(itemModel);
    if (!result.isSuccess) {
      throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, 'Error while creating item, please try again later');
    }
    const itemId: Types.ObjectId = result.getValue().id;
    const newItem = await this.iTemRepository.getItemById(itemId);
    const itemResponse = ItemParser.createItemResponse(newItem.getValue());
    return Result.ok(itemResponse);
  }

  async getItems(): Promise<Result<ITemResponseDTO[]>> {
    await this.singleclientService.validateContext();
    const result: Result<Item[]> = await this.iTemRepository.getItems({});
    const items = result.getValue();
    let reponse: ITemResponseDTO[] = [];
    if (items && items.length) {
      reponse = ItemParser.createItemsresponse(items);
    }
    return Result.ok(reponse);
  }

  async getItemById(id: Types.ObjectId): Promise<Result<ITemResponseDTO>> {
    const item = await this.iTemRepository.getItemById(id);
    if (!item.isSuccess) {
      throwApplicationError(HttpStatus.BAD_REQUEST, `Item does not exists`);
    }
    const response: ITemResponseDTO = ItemParser.createItemResponse(item.getValue());
    return Result.ok(response);
  }
}
