import { Types } from 'mongoose';
import { Result } from './../domain/result/result';
import { LoginMerchantDTO } from './dtos';
import { CreateMerchantDTO } from './dtos/create-merchant.dto';
import { IMerchantResponseDTO } from './merchant-response.dto';

export interface IMerchantService {
  createMerchant(
    props: CreateMerchantDTO,
  ): Promise<Result<IMerchantResponseDTO>>;

  getMerchantById(id: Types.ObjectId): Promise<Result<IMerchantResponseDTO>>;
  signIn(props: LoginMerchantDTO): Promise<Result<IMerchantResponseDTO>>;
}
