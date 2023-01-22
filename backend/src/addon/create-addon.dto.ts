import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class createAddonDTO {
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
  readonly description: string;
}
