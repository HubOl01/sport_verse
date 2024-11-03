import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreatePlanExerciseDto {
  @ApiProperty({ required: true })
  @IsNumber()
  trainingPlanId: number;
  @ApiProperty({ required: true })
  @IsNumber()
  setTotal: number;
  @ApiProperty({ required: true })
  @IsNumber()
  repTotal: number;
  @ApiProperty({ required: true })
  @IsNumber()
  exerciseStatus: number;
  @ApiProperty({ required: true })
  @IsNumber()
  exerciseId: number;
}
