import { AuditParser } from '../audit';
import { Addon } from './addon';
import { IAddonResponseDTO } from './addon-response.dto';

export class AddonParser {
  static createAddonResponse(addon: Addon): IAddonResponseDTO {
    const { name, description, audit, id, quantity } = addon;
    return { id, name, description, quantity, ...AuditParser.createAuditResponse(audit) };
  }

  static createAddonsResponse(addons: Addon[]): IAddonResponseDTO[] {
    return addons.map((addon) => this.createAddonResponse(addon));
  }
}
