import { Types } from 'mongoose';

export interface IOrderNoteModel {
  orderId: Types.ObjectId;
  note: string;
}
