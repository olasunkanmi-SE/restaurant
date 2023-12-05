import { OrderNoteMapper } from 'src/order_notes/order_note.mapper';
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
    private readonly orderNoteMapper: OrderNoteMapper,
  ) {
    this.context = this.contextService.getContext();
  }
  createOrderNoteEntity(props: CreateOrderNoteDTO): OrderNote {
    const audit: Audit = Audit.createInsertContext(this.context);
    return OrderNote.create({ ...props, audit });
  }

  async createNotes(props: CreateOrderNoteDTO[]): Promise<Result<OrderNote[]>> {
    try {
      const notes = props.map((note) => {
        const noteEntity = this.createOrderNoteEntity(note);
        return this.orderNoteMapper.toPersistence(noteEntity);
      });
      return this.orderNoteRepository.insertMany(notes);
    } catch (error) {
      console.error(error);
      throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, `Unexpected error creating order notes`);
    }
  }

  getOrderNotes(): Promise<Result<OrderNote[]>> {
    return this.orderNoteRepository.find({});
  }
}
