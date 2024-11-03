import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateTrainingPlanDto {
  @ApiProperty({ required: true })
  @IsString()
  title: string;
  @ApiProperty({ required: true, default: 1 })
  @IsInt()
  statusPublishId: number;
  @ApiProperty({ required: true })
  @IsString()
  description: string;
  date_created: Date;
  @ApiProperty({ required: true })
  @IsInt()
  userId: number;
  @ApiProperty({ required: true })
  @IsString()
  date_start: Date;
  @ApiProperty({ required: true })
  @IsString()
  date_end: Date;
  @ApiProperty({ required: true })
  @IsInt()
  statusTrainingId: number;
  @ApiProperty({ required: true })
  @IsInt()
  sportTypeId: number;
}
