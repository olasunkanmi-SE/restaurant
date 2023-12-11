import { IsString, IsNotEmpty, Length, IsEmail } from 'class-validator';
import { Types } from 'mongoose';
export class CreateOrderManager {
  @IsString()
  @IsNotEmpty()
  @Length(2, 128)
  readonly firstName: string;

  @IsString()
  @Length(2, 128)
  readonly lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Length(2, 128)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 128)
  readonly phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 128)
  readonly singleclientId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  readonly role: number;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
