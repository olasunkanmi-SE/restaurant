import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, MaxLength, Min } from 'class-validator';

export class CreateItemDTO {
  @IsString()
  @IsNotEmpty()
  @Length(2, 256)
  name: string;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  @Max(1000)
  @Min(0)
  @IsOptional()
  quantity: number;

  @IsNumber()
  @IsOptional()
  maximumPermitted: number;
}
