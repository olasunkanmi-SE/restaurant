import { AuditParser } from 'src/audit';
import { Addon } from './addon';
import { IAddonResponseDTO } from './addon-response.dto';

export class AddonParser {
  static createAddonResponse(addon: Addon): IAddonResponseDTO {
    const { category, description, code, audit, id } = addon;
    return { id, category, description, code, ...AuditParser.createAuditResponse(audit) };
  }

  static createAddonsResponse(addons: Addon[]): IAddonResponseDTO[] {
    return addons.map((addon) => this.createAddonResponse(addon));
  }
}
