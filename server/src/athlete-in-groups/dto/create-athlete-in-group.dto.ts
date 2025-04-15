import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateAthleteInGroupDto {
  @ApiProperty({ required: true })
  @IsNumber()
  trainingGroupId: number;
  @ApiProperty({ required: true })
  @IsNumber()
  athleteId: number;
  joinedAt: Date;
}
