import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateExerciseDto {
  @ApiProperty({ required: true })
  @IsString()
  name: string;
  @ApiProperty({ required: true })
  @IsString()
  description: string;
  @ApiProperty({ required: true })
  @IsNumber()
  ExerciseCategoryId: number;
  @ApiProperty({ required: false })
  @IsNumber()
  userId: number;
  @ApiProperty({ required: true })
  @IsString()
  imageString: string;
  @ApiProperty({ required: true, default: true })
  @IsBoolean()
  isPrivate: boolean;
}
