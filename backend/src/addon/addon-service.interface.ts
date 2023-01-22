import { Result } from './../domain/result/result';
import { IAddonResponseDTO } from './addon-response.dto';
import { CreateAddonDTO } from './create-addon.dto';

export interface IAddonService {
  createAddon(props: CreateAddonDTO): Promise<Result<IAddonResponseDTO>>;
  getAddons(): Promise<Result<IAddonResponseDTO[]>>;
}
