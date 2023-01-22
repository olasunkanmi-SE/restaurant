import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateAddonDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  readonly code: string;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  readonly description: string;
}
