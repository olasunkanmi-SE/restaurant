import { IsString, IsNotEmpty, Length, MaxLength, IsOptional } from 'class-validator';
export class createCategoryDTO {
  @IsString()
  @IsNotEmpty()
  @Length(2, 256)
  name: string;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  description: string;
}
