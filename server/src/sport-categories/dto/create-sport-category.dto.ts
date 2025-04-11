import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSportCategoryDto {
  id: number;
  title: string;
  image: string;
}
