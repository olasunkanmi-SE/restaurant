import { IsArray, IsNumber, IsObject, IsOptional, IsString, Length } from 'class-validator';
import { Addon } from '../addon';
import { Category } from '../category/category';
import { Item } from './../item/item';
import { Types } from 'mongoose';

export class UpdateMenuDTO {
  @IsString()
  @IsOptional()
  @Length(2, 256)
  readonly name: string;

  @IsString()
  @IsOptional()
  @Length(2, 256)
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly imageUrl: string;

  @IsNumber()
  @IsOptional()
  readonly discount;

  @IsNumber()
  @IsOptional()
  readonly basePrice;

  @IsOptional()
  @IsArray()
  readonly itemIds?: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  readonly addonIds?: Types.ObjectId[];

  @IsOptional()
  readonly categoryId: Types.ObjectId;
}
