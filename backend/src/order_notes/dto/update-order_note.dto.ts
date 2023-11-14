import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderNoteDTO } from './create-order_note.dto';

export class UpdateOrderStatusDto extends PartialType(CreateOrderNoteDTO) {}
