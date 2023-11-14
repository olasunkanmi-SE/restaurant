import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrderNoteDTO {
  @IsString()
  @IsNotEmpty()
  @Length(2, 256)
  note: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 128)
  readonly orderId: Types.ObjectId;
}
