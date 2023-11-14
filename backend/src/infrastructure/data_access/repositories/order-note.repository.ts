import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Result } from 'src/domain';
import { GenericDocumentRepository } from 'src/infrastructure/database';
import { throwApplicationError } from 'src/infrastructure/utilities/exception-instance';
import { OrderNote } from 'src/order_notes/order_note';
import { OrderNoteMapper } from 'src/order_notes/order_note.mapper';
import { IOrderNoteRespository } from './interfaces/order-note.repository';
import { OrderNoteDocument, OrderNoteModel } from './schemas/order-Note.schema';

@Injectable()
export class OrderNoteRepository
  extends GenericDocumentRepository<OrderNote, OrderNoteDocument>
  implements IOrderNoteRespository
{
  orderNoteMapper: OrderNoteMapper;
  constructor(
    @InjectModel(OrderNoteModel.name) orderNoteDataModel: Model<OrderNoteDocument>,
    @InjectConnection() readonly connection: Connection,
    orderNoteMapper: OrderNoteMapper,
  ) {
    super(orderNoteDataModel, connection, orderNoteMapper);
    this.orderNoteMapper = orderNoteMapper;
  }

  async createOrderNote(note: OrderNote): Promise<Result<OrderNote>> {
    const orderNoteToSave = this.orderNoteMapper.toPersistence(note);
    const result = (await this.create(orderNoteToSave)).getValue();
    if (!result) {
      throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, `Error while creating order note`);
    }
    return Result.ok(result);
  }
}
