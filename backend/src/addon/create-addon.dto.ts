import { Types } from 'mongoose';
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber, IsArray } from 'class-validator';
import { Menu } from '../menu';

export class CreateAddonDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @IsNumber()
  @IsNotEmpty()
  readonly unitPrice: number;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  readonly description: string;

  @IsNotEmpty()
  categoryId: Types.ObjectId;

  @IsOptional()
  @IsArray()
  menuIds: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  menus: Menu[];
}
