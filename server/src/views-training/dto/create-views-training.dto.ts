import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt } from 'class-validator';

export class CreateViewsTrainingDto {
  @IsInt()
  @ApiProperty({ required: true })
  userId: number;
  @IsInt()
  @ApiProperty({ required: true })
  trainingPlanId: number;
  @IsDate()
  @ApiProperty({ required: false })
  createdAt: Date;
}
