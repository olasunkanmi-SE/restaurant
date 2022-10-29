import { Types } from 'mongoose';

export interface IAuthStrategy {
  validate(request: Request, payload: any): unknown;
}

export interface IUserPayload {
  userId: Types.ObjectId;
  email: string;
  role?: string;
}
