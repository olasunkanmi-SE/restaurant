import { Observable } from 'rxjs';
import { IMerchant } from './../../shared/models/merchant.model';

export interface IMerchantService {
  getMerchants(): Observable<IMerchant[]>;
}
