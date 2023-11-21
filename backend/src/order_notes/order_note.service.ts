import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TYPES } from 'src/application';
import { Audit, Result } from 'src/domain';
import { Context, IContextService } from 'src/infrastructure';
import { IOrderNoteRespository } from 'src/infrastructure/data_access/repositories/interfaces/order-note.repository';
import { throwApplicationError } from 'src/infrastructure/utilities/exception-instance';
import { CreateOrderNoteDTO } from './dto/create-order_note.dto';
import { IOrderNoteService } from './interface/order-note-service.interface';
import { OrderNote } from './order_note';

@Injectable()
export class OrderNoteService implements IOrderNoteService {
  private context: Context;
  constructor(
    @Inject(TYPES.IOrderNoteRepository) private readonly orderNoteRepository: IOrderNoteRespository,
    @Inject(TYPES.IContextService)
    private readonly contextService: IContextService,
  ) {
    this.context = this.contextService.getContext();
  }
  async createOrderNote(props: CreateOrderNoteDTO): Promise<OrderNote> {
    const audit: Audit = Audit.createInsertContext(this.context);
    const orderNoteEntity = OrderNote.create({ ...props, audit });
    const result = await this.orderNoteRepository.createOrderNote(orderNoteEntity);
    if (!result) {
      throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, `Error creating order note`);
    }
    const orderNote = result.getValue();
    return orderNote;
  }

  async createNotes(props: CreateOrderNoteDTO[]): Promise<OrderNote[]> {
    const notes = props.map((note) => this.createOrderNote(note));
    const result = await Promise.all(notes);
    if (!result) {
      throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, `Error creating order notes`);
    }
    return result;
  }

  getOrderNotes(): Promise<Result<OrderNote[]>> {
    return this.orderNoteRepository.find({});
  }
}
