import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateExerciseDto {
  @ApiProperty({ required: true })
  @IsNumber()
  planExerciseId: number;
  @ApiProperty({ required: true })
  @IsString()
  name: string;
  @ApiProperty({ required: true })
  @IsString()
  description: string;
  @ApiProperty({ required: true })
  @IsNumber()
  ExerciseCategoryId: number;
  @ApiProperty({ required: true })
  @IsString()
  imageString: string;
}
