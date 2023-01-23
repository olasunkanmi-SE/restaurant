import { AddonParser } from './../addon/addon.parser';
import { AuditParser } from 'src/audit';
import { Item } from './item';
import { ITemResponseDTO } from './item-response.dto';

export class ItemParser {
  static createItemResponse(item: Item): ITemResponseDTO {
    const ITemResponse: ITemResponseDTO = {
      id: item.id,
      name: item.name,
      description: item.description,
      portion: item.portion,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      tags: item.tags,
      maximumPermitted: item.maximumPermitted,
      taxRate: item.taxRate,
      addons: AddonParser.createAddonsResponse(item.addons),
      ...AuditParser.createAuditResponse(item.audit),
    };
    return ITemResponse;
  }

  static createItemsresponse(items: Item[]): ITemResponseDTO[] {
    const itemResponses: ITemResponseDTO[] = [];
    items.forEach((item) => itemResponses.push(ItemParser.createItemResponse(item)));
    return itemResponses;
  }
}
