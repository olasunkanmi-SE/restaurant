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
  @IsOptional()
  @MaxLength(256)
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsOptional()
  @MaxLength(256)
  readonly lastName: string;

  @IsString()
  @IsOptional()
  @MaxLength(256)
  readonly organisationName: string;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  readonly phoneNumber: string;

  @IsNotEmpty()
  @MaxLength(256)
  readonly passwordHash: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(30)
  readonly role: string;

  @IsBoolean()
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
