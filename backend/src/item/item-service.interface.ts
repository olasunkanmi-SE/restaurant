import { Result } from './../domain/result/result';
import { CreateItemDTO } from './create-item-schema';
import { ITemResponseDTO } from './menu-response.dto';

export interface IItemService {
  createItem(props: CreateItemDTO): Promise<Result<ITemResponseDTO>>;
}
