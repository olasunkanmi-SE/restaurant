import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Types } from 'mongoose';
import { Addon } from '../addon';
import { Category } from '../category/category';
import { Item } from './../item/item';

export class CreateMenuDTO {
  @IsString()
  @IsNotEmpty()
  @Length(2, 256)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 256)
  readonly note: string;

  @IsString()
  @IsOptional()
  @Length(2, 256)
  readonly description?: string;

  @IsString()
  readonly imageUrl: string;

  @IsArray()
  readonly itemIds: Types.ObjectId[];

  @IsNotEmpty()
  readonly categoryId: Types.ObjectId;

  @IsNumber()
  @IsOptional()
  readonly discount;

  @IsNumber()
  @IsOptional()
  readonly quantityAvailable;

  @IsNumber()
  readonly basePrice;

  category: Category;

  @IsOptional()
  @IsArray()
  items: Item[];

  @IsOptional()
  @IsArray()
  addons: Addon[];

  @IsNotEmpty()
  readonly restaurantId: Types.ObjectId;
}
