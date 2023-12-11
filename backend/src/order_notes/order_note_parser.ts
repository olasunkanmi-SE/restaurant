import { AuditParser } from '../audit/audit.parser';
import { IOrderNoteResponseDTO } from './dto/order-note-response';
import { OrderNote } from './order_note';

export class OrderNoteParser {
  static createResponse({ id, note, orderId, audit }: OrderNote): IOrderNoteResponseDTO {
    return { id, note, orderId, ...AuditParser.createAuditResponse(audit) };
  }

  static createOrderNotesResponse(orderNotes: OrderNote[]): IOrderNoteResponseDTO[] {
    let notes: IOrderNoteResponseDTO[] = [];
    if (orderNotes?.length) {
      notes = orderNotes.map((note) => {
        return this.createResponse(note);
      });
    }
    return notes;
  }
}
