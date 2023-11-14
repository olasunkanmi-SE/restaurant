import { Injectable } from '@nestjs/common';
import { AuditMapper } from 'src/audit';
import { IMapper } from 'src/domain';
import { OrderNoteModel } from './../infrastructure/data_access/repositories/schemas/order-note.schema';
import { OrderNote } from './order_note';

@Injectable()
export class OrderNoteMapper implements IMapper<OrderNote, OrderNoteModel> {
  constructor(private readonly auditMapper: AuditMapper) {}
  toPersistence(entity: OrderNote): OrderNoteModel {
    const { id, orderId, note, audit } = entity;
    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    } = audit;
    const orderNoteDocument: OrderNoteModel = {
      _id: id,
      orderId,
      note,
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedDateTime,
      auditDeletedBy,
    };
    return orderNoteDocument;
  }

  toDomain(model: OrderNoteModel): OrderNote {
    const { _id, orderId, note } = model;
    const entity: OrderNote = OrderNote.create(
      {
        orderId,
        note,
        audit: this.auditMapper.toDomain(model),
      },
      _id,
    );
    return entity;
  }
}
