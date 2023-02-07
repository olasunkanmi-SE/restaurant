import { Item } from './../item/item';
import { IsString, IsNotEmpty, Length, IsOptional, IsArray, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMenuDTO {
  @IsString()
  @IsNotEmpty()
  @Length(2, 256)
  readonly name: string;

  @IsString()
  @IsOptional()
  @Length(2, 256)
  readonly description?: string;

  @IsString()
  readonly imageUrl: string;

  @IsOptional()
  @IsArray()
  readonly itemIds?: Types.ObjectId[];

  @IsNumber()
  @IsOptional()
  readonly discount;

  @IsOptional()
  @IsArray()
  items: Item[];
}
