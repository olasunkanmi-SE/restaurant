import { Result } from 'src/domain';
import { CreateOrderNoteDTO } from '../dto/create-order_note.dto';
import { IOrderNoteResponseDTO } from '../dto/order-note-response';
import { OrderNote } from '../order_note';

export interface IOrderNoteService {
  createOrderNote(props: CreateOrderNoteDTO): Promise<Result<IOrderNoteResponseDTO>>;
  getOrderNotes(): Promise<Result<OrderNote[]>>;
}
