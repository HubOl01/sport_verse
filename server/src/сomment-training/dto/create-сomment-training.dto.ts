import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateСommentTrainingDto {
  @ApiProperty({ required: true })
  @IsString()
  content: string;
  @ApiProperty({ required: true })
  @IsInt()
  userId: number;
  @ApiProperty({ required: true })
  @IsInt()
  trainingPlanId: number;
  @ApiProperty({ required: true })
  @IsDate()
  createdAt: Date;
  @ApiProperty({ required: false })
  @IsInt()
  parentCommentId: number;
}
