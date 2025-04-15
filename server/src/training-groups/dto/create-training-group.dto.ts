import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTrainingGroupDto {
  @ApiProperty({ required: true })
  @IsString()
  title: string;
  @ApiProperty({ required: true })
  @IsString()
  desc: string;
  @ApiProperty({ required: true })
  @IsNumber()
  trainerId: number;
}
