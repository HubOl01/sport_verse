import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty()
  nameCategory: string;

  @IsString()
  @ApiProperty()
  colorCategory: string;
}
