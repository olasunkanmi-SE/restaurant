import { CategoryParser } from './../category/category.parser';
import { AuditParser } from '../audit';
import { Addon } from './addon';
import { IAddonResponseDTO } from './addon-response.dto';

export class AddonParser {
  static createAddonResponse(addon: Addon): IAddonResponseDTO {
    const { name, description, audit, id, quantity, category, unitPrice } = addon;
    return {
      id,
      name,
      description,
      quantity,
      unitPrice,
      category: category ? CategoryParser.createCategoryResponse(category) : undefined,
      ...AuditParser.createAuditResponse(audit),
    };
  }

  static createAddonsResponse(addons: Addon[]): IAddonResponseDTO[] {
    return addons.map((addon) => this.createAddonResponse(addon));
  }
}
