import { Types } from 'mongoose';
import { Audit } from 'src/domain';

export interface IOrderNote {
  orderId: Types.ObjectId;
  menuId: Types.ObjectId;
  note: string;
  audit: Audit;
}
