import { Body, Controller, Inject, Post } from '@nestjs/common';
import { TYPES } from './../application/constants/types';
import { Result } from './../domain/result/result';
import { CreateItemDTO } from './create-item-schema';
import { ITemResponseDTO } from './item-response.dto';
import { IItemService } from './item-service.interface';
@Controller('items')
export class ItemController {
  constructor(@Inject(TYPES.IItemService) private readonly itemService: IItemService) {}

  @Post()
  async createItem(@Body() request: CreateItemDTO): Promise<Result<ITemResponseDTO>> {
    return this.itemService.createItem(request);
  }
}
