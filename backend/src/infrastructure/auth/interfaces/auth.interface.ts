import { Types } from 'mongoose';

export interface IAuthStrategy {
  validate(request: Request, payload: any): unknown;
}

interface IPayload {
  email: string;
  role: string;
}

export interface IUserPayload extends IPayload {
  userId: Types.ObjectId;
}

export interface IJwtPayload extends IPayload {
  sub: Types.ObjectId;
}
export interface ISignUpTokens {
  refreshToken: string;
  accessToken: string;
}
