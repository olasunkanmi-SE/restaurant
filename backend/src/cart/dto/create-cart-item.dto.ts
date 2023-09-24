import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCartItemDTO {
  @IsString()
  @IsNotEmpty()
  menuId: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;
}
