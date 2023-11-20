import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderStatusDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  code: string;
  @IsString()
  description?: string;
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
