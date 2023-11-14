import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { TYPES } from 'src/application';
import { CreateOrderNoteDTO } from './dto/create-order_note.dto';
import { IOrderNoteService } from './interface/order-note-service.interface';

@Controller('order-statuses')
export class OrderNotesController {
  constructor(@Inject(TYPES.IOrderNoteService) private readonly orderNoteService: IOrderNoteService) {}

  @Post()
  create(@Body() createOrderNote: CreateOrderNoteDTO) {
    return this.orderNoteService.createOrderNote(createOrderNote);
  }

  @Get()
  findAll() {
    return this.orderNoteService.getOrderNotes();
  }
}
