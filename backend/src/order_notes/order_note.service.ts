import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from 'src/application';
import { Audit, Result } from 'src/domain';
import { Context, IContextService } from 'src/infrastructure';
import { IOrderNoteRespository } from 'src/infrastructure/data_access/repositories/interfaces/order-note.repository';
import { OrderNote } from './order_note';
import { OrderNoteParser } from './order_note_parser';
import { CreateOrderNoteDTO } from './dto/create-order_note.dto';
import { IOrderNoteResponseDTO } from './dto/order-note-response';
import { IOrderNoteService } from './interface/order-note-service.interface';

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
  async createOrderNote(props: CreateOrderNoteDTO): Promise<Result<IOrderNoteResponseDTO>> {
    const audit: Audit = Audit.createInsertContext(this.context);
    const orderNoteEntity = OrderNote.create({ ...props, audit });
    const result = await this.orderNoteRepository.createOrderNote(orderNoteEntity);
    const orderNote = result.getValue();
    const response: IOrderNoteResponseDTO = OrderNoteParser.createResponse(orderNote);
    return Result.ok(response);
  }

  getOrderNotes(): Promise<Result<OrderNote[]>> {
    return this.orderNoteRepository.find({});
  }
}
