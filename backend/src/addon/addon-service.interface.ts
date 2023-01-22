import { Result } from './../domain/result/result';
import { IAddonResponseDTO } from './addon-response.dto';
import { createAddonDTO } from './create-addon.dto';

export interface IAddonService {
  createAddon(props: createAddonDTO): Promise<Result<IAddonResponseDTO>>;
  getAddons(): Promise<Result<IAddonResponseDTO[]>>;
}
