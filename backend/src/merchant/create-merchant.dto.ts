import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateMerchantDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  readonly organisationName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  readonly phoneNumber: string;

  @IsNotEmpty()
  @MaxLength(256)
  readonly passwordHash: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly role: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly isActive: boolean;

  @IsBoolean()
  @MaxLength(30)
  @IsOptional()
  readonly status: string;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  readonly organisationAddress: string;
}
