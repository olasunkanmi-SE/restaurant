import { Types } from 'mongoose';
import { IAudit } from 'src/infrastructure';
import { IOrderNoteResponseDTO } from 'src/order_notes/dto/order-note-response';
import { OrderStatus } from 'src/order_statuses/order_status';

export interface IOrderResponseDTO extends IAudit {
  id: Types.ObjectId;
  state: OrderStatus;
  type: string;
  merchantId: Types.ObjectId;
  customerId?: Types.ObjectId;
  total: number;
  discount?: number;
  notes?: IOrderNoteResponseDTO[];
  orderManagerId?: Types.ObjectId;
}
