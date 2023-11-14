import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderStatusDto {
  @IsString()
  @IsNotEmpty()
  isActive: boolean;
  name: string;
  code: string;
  description?: string;
}
