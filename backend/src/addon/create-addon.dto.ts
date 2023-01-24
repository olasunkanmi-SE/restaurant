import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber } from 'class-validator';

export class CreateAddonDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  readonly description: string;
}
