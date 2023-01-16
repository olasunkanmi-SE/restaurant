import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { portion } from './../infrastructure/data_access/repositories/interfaces/item-model.interface';

export class CreateItemDTO {
  @IsString()
  @IsNotEmpty()
  @Length(2, 256)
  name: string;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsNotEmpty()
  portion: portion;

  @IsNumber()
  price: number;

  @IsNumber()
  @MaxLength(1000)
  @IsOptional()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  image: string;

  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  @IsNumber()
  @IsOptional()
  maximumPermitted: number;

  @IsNumber()
  @IsOptional()
  taxRate: number;
}
