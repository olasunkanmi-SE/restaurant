import { CreateLocationDTO } from './../location/create-location.dto';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
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
  @IsOptional()
  readonly timeZone: string;

  @IsObject()
  @IsNotEmpty()
  readonly location: CreateLocationDTO;
}
