import { Observable } from 'rxjs';
import { IUserResponse } from 'src/app/shared/models/merchant.model';
import { IUser } from './../../shared/models/merchant.model';
export interface IAuthService {
  createUser(payload: IUser): Observable<IUserResponse>;
}
