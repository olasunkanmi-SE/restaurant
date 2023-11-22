import { Result } from 'src/domain';
import { CreateOrderNoteDTO } from '../dto/create-order_note.dto';
import { OrderNote } from '../order_note';

export interface IOrderNoteService {
  createOrderNoteEntity(props: CreateOrderNoteDTO): OrderNote;
  getOrderNotes(): Promise<Result<OrderNote[]>>;
  createNotes(props: CreateOrderNoteDTO[]): Promise<Result<OrderNote[]>>;
}
