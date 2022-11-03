import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMerchantDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MaxLength(256)
  readonly passwordHash: string;
}
