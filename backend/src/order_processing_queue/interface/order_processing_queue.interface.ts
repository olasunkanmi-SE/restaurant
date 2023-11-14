import { Types } from 'mongoose';
import { Audit } from 'src/domain';

export interface IOrderProcessingQueue {
  orderId: Types.ObjectId;
  orderStatusId: Types.ObjectId;
  audit: Audit;
}
