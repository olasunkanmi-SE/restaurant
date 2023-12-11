import { Audit } from '../../domain/audit/audit';
export interface ISingleClient {
  firstName?: string;
  lastName?: string;
  email: string;
  organisationName?: string;
  phoneNumber?: string;
  passwordHash: string;
  role?: string;
  isActive?: boolean;
  status?: string;
  organisationAddress?: string;
  refreshTokenHash?: string;
  audit: Audit;
}
