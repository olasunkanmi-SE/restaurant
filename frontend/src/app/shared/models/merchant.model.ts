import { IAudit } from './audit.model';
import { IAuthTokens } from './token.model';

export interface IMerchant extends IAudit {
  isSuccess: boolean;
  data: {
    id: any;
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
  };
  message: string;
}
export interface IUser {
  email: string;
  password: string;
}

export interface IUserResponse {
  isSuccess: boolean;
  data: {
    id: any;
    firstName: string;
    lastName: string;
    email: string;
    organisationName: string;
    phoneNumber: string;
    role: string;
    isActive: boolean;
    status?: string;
    organisationAddress: string;
    tokens?: {
      refreshToken: string;
      accessToken: string;
    };
    tokenExpiresIn: number;
  };
  message: {
    statusCode: number;
    message: string;
  };
}
