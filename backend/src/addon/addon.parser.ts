import { AuditParser } from 'src/audit';
import { Addon } from './addon';
import { IAddonResponseDTO } from './addon-response.dto';

export class AddonParser {
  static createAddonResponse(addon: Addon): IAddonResponseDTO {
    const { name, description, code, audit, id, quantity } = addon;
    return { id, name, description, quantity, code, ...AuditParser.createAuditResponse(audit) };
  }

  static createAddonsResponse(addons: Addon[]): IAddonResponseDTO[] {
    return addons.map((addon) => this.createAddonResponse(addon));
  }
}
