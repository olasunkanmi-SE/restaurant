import { Result } from 'src/domain';
import { IGenericDocument } from 'src/infrastructure/database';
import { OrderNote } from 'src/order_notes/order_note';
import { OrderNoteDocument } from '../schemas/order-note.schema';

export interface IOrderNoteRespository extends IGenericDocument<OrderNote, OrderNoteDocument> {
  createOrderNote(note: OrderNote): Promise<Result<OrderNote>>;
}
