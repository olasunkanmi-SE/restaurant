import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class OnBoardMerchantDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  readonly organisationName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  readonly phoneNumber: string;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  readonly organisationAddress: string;
}
