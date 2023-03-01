import { AuditParser } from '../audit';
import { Item } from './item';
import { ITemResponseDTO } from './item-response.dto';

export class ItemParser {
  static createItemResponse(item: Item): ITemResponseDTO {
    const ITemResponse: ITemResponseDTO = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      maximumPermitted: item.maximumPermitted,
      ...AuditParser.createAuditResponse(item.audit),
    };
    return ITemResponse;
  }

  static createItemsresponse(items: Item[]): ITemResponseDTO[] {
    return items.map((item) => ItemParser.createItemResponse(item));
  }
}
