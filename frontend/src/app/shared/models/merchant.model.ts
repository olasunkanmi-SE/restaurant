import { IAudit } from './audit.model';
import { IAuthTokens } from './token.model';

export interface IMerchant extends IAudit {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  organisationName: string;
  phoneNumber: string;
  role: string;
  isActive: boolean;
  status?: string;
  organisationAddress: string;
  tokens?: IAuthTokens;
}
