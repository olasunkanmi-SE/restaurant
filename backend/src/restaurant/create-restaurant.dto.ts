import { Menu } from './../menu/menu';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Types } from 'mongoose';
import { CreateLocationDTO } from './../location/create-location.dto';
import { PaymentMethod } from './restaurant.interface';
export class CreateRestaurantDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  readonly name: string;

  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly isActive: boolean;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  readonly webUrl: string;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  readonly logoUrl: string;

  @IsString()
  @MaxLength(256)
  readonly imageUrl: string;

  @IsNumber()
  readonly openingHour: number;

  @IsNumber()
  readonly closingHour: number;

  @IsBoolean()
  @IsOptional()
  readonly opened: boolean;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  readonly timeZone: string;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  readonly phoneNumber: string;

  @IsString({ each: true })
  @IsOptional()
  readonly paymentMethod: PaymentMethod[];

  @IsArray()
  @IsOptional()
  readonly menus: Menu[];

  @IsObject()
  @IsNotEmpty()
  readonly location: CreateLocationDTO;

  @IsString()
  readonly singleclientId: Types.ObjectId;
}
