import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateJoinRequestDto {
  @ApiProperty({ required: true })
  @IsInt()
  trainingGroupId: number;
  @ApiProperty({ required: true })
  @IsInt()
  athleteId: number;
}
