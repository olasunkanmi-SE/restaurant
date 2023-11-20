import { Types } from 'mongoose';

export interface IOrderNoteModel {
  orderId: Types.ObjectId;
  menuId: Types.ObjectId;
  note: string;
}
