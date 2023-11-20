import { Result } from 'src/domain';
import { CreateOrderNoteDTO } from '../dto/create-order_note.dto';
import { OrderNote } from '../order_note';

export interface IOrderNoteService {
  createOrderNote(props: CreateOrderNoteDTO): Promise<OrderNote>;
  getOrderNotes(): Promise<Result<OrderNote[]>>;
  createNotes(props: CreateOrderNoteDTO[]): Promise<OrderNote[]>;
}
