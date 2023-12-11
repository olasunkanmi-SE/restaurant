import { Types } from 'mongoose';
import { IAudit } from './../infrastructure/database/mongoDB/base-document.interface';
import { SingleClientApiResponse } from './../singleclient/singleclient-parser';
export interface IOrderManagerDTO extends IAudit {
  id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  singleclient: SingleClientApiResponse;
  role: number;
}
