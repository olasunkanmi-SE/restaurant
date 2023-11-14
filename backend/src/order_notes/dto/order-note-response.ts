import { Types } from 'mongoose';
import { IAudit } from 'src/infrastructure';

export interface IOrderNoteResponseDTO extends IAudit {
  id: Types.ObjectId;
  note: string;
  orderId: Types.ObjectId;
}
