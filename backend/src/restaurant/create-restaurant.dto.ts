import { CreateLocationDto } from './../location/create-location.dto';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  MaxLength,
} from 'class-validator';
export class CreateRestaurantDto {
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
  readonly webUrl: string;

  @IsString()
  @MaxLength(256)
  readonly logoUrl: string;

  @IsString()
  @MaxLength(256)
  readonly timeZone: string;

  @IsObject()
  @IsNotEmpty()
  readonly location: CreateLocationDto;
}
