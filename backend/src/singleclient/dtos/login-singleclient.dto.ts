import { IsString, IsNotEmpty, MaxLength, IsEmail } from 'class-validator';

export class LoginSingleClientDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MaxLength(256)
  readonly password: string;
}
