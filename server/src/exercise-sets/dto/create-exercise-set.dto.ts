import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateExerciseSetDto {
  // id: number;
  @ApiProperty({ required: true })
  @IsNumber()
  planExerciseId: number;
  @ApiProperty({ required: true })
  @IsDate()
  date: Date;
  @ApiProperty({ required: true })
  @IsInt()
  duration: bigint;
  @ApiProperty({ required: true })
  @IsNumber()
  distance: number;
  @ApiProperty({ required: true })
  @IsNumber()
  weight: number;
  @ApiProperty({ required: true })
  @IsNumber()
  repetitions: number;
  @ApiProperty({ required: true })
  @IsNumber()
  calories_burned: number;
  // @ApiProperty({ required: true })
  // @IsString()
  // route_gpx: string;
  @ApiProperty({ required: true })
  @IsString()
  stringType: string;
}
