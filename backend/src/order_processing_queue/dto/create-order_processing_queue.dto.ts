import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrderProcessingQueueDTO {
  @IsString()
  @IsNotEmpty()
  @Length(2, 128)
  readonly orderStatusId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @Length(2, 128)
  readonly orderId: Types.ObjectId;
}
