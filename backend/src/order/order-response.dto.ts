import { Types } from 'mongoose';
import { IAudit } from 'src/infrastructure';
import { IOrderNoteResponseDTO } from 'src/order_notes/dto/order-note-response';
import { IOrderStatusResponseDTO } from 'src/order_statuses/dto/order-status-response';

export interface IOrderResponseDTO extends IAudit {
  id: Types.ObjectId;
  state: IOrderStatusResponseDTO;
  type: string;
  merchantId: Types.ObjectId;
  customerId?: Types.ObjectId;
  total: number;
  discount?: number;
  notes?: IOrderNoteResponseDTO[];
  orderManagerId?: Types.ObjectId;
}
