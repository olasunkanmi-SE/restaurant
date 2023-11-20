import { IGenericDocument } from 'src/infrastructure/database';
import { Merchant } from 'src/merchant';
import { MerchantDocument } from '../schemas';

export interface IMerchantRepository extends IGenericDocument<Merchant, MerchantDocument> {}
