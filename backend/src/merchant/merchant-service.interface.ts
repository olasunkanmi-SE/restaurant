import { Types } from 'mongoose';
import { Result } from './../domain/result/result';
import { CreateMerchantDTO } from './create-merchant.dto';
import { IMerchantResponseDTO } from './merchant-response.dto';

export interface IMerchantService {
  createMerchant(
    props: CreateMerchantDTO,
  ): Promise<Result<IMerchantResponseDTO>>;

  getMerchantById(id: Types.ObjectId): Promise<Result<IMerchantResponseDTO>>;
}
