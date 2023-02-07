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
      category: CategoryParser.createCategoryResponse(category),
      ...AuditParser.createAuditResponse(audit),
    };
  }

  static createAddonsResponse(addons: Addon[]): IAddonResponseDTO[] {
    return addons.map((addon) => this.createAddonResponse(addon));
  }
}
