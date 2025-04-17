import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsString } from 'class-validator';

export class CreatePlanInGroupDto {
  @ApiProperty({ required: true })
  @IsString()
  title: string;
  @ApiProperty({ required: true })
  @IsString()
  desc: string;
  @ApiProperty({ required: false })
  @IsDate()
  planAt: Date;
  @ApiProperty({ required: true })
  @IsInt()
  planId: number;
  @ApiProperty({ required: true })
  @IsInt()
  groupId: number;
}
