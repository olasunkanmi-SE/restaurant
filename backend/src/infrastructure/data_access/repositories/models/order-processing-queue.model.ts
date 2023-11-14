import { Types } from 'mongoose';

export interface IOrderProcessingQueueModel {
  readonly orderId: Types.ObjectId;
  readonly orderStatusId: Types.ObjectId;
}
