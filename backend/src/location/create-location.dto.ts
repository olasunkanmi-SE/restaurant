import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  readonly address: string;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  readonly address2: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  readonly postCode: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  readonly state: string;

  @IsNumber()
  @MaxLength(10)
  @IsOptional()
  readonly latitude: string;

  @IsNumber()
  @MaxLength(10)
  @IsOptional()
  readonly longitude: string;
}
