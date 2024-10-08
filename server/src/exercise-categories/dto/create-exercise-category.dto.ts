import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseCategoryDto {
  @ApiProperty({ required: true })
  title: string;
}
