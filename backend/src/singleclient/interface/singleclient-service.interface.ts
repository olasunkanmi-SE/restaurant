import { Types } from 'mongoose';
import { Result } from '../../domain/result/result';
import { LoginSingleClientDTO } from '../dtos';
import { CreateSingleClientDTO } from '../dtos/create-singleclient.dto';
import { OnBoardSingleClientDTO } from '../dtos/on-board-singleclient.dto';
import { ISingleClientResponseDTO } from '../singleclient-response.dto';

export interface ISingleClientService {
  createSingleClient(props: CreateSingleClientDTO): Promise<Result<ISingleClientResponseDTO>>;

  getSingleClientById(id: Types.ObjectId): Promise<Result<ISingleClientResponseDTO>>;

  signIn(props: LoginSingleClientDTO): Promise<Result<ISingleClientResponseDTO>>;

  onBoardSingleClient(props: OnBoardSingleClientDTO, id: Types.ObjectId): Promise<Result<ISingleClientResponseDTO>>;

  getAccessTokenAndUpdateRefreshToken(
    userId: Types.ObjectId,
    refreshToken: string,
  ): Promise<Result<{ accessToken: string }>>;

  signOut(userId: Types.ObjectId): Promise<void>;
  validateContext(): Promise<boolean>;
  getSingleClients(): Promise<Result<ISingleClientResponseDTO[]>>;
}
