import { Types } from 'mongoose';
import { IAudit } from 'src/infrastructure';

export interface IOrderProcessingQueueResponseDTO extends IAudit {
  id: Types.ObjectId;
  orderStatusId: Types.ObjectId;
  orderId: Types.ObjectId;
}
