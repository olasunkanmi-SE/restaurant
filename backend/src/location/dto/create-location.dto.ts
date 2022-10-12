import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  readonly address: string;

  @IsString()
  @MaxLength(256)
  readonly address2: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  readonly postalCode: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly state: string;

  @IsNumber()
  @MaxLength(10)
  readonly latitude: string;

  @IsNumber()
  @MaxLength(10)
  readonly longitude: string;
}
