import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ required: true })
  @IsString()
  title: string;
  @ApiProperty({ required: true })
  @IsString()
  description: string;
  @ApiProperty({ required: false })
  @IsString()
  image?: string;
  @ApiProperty({ required: false, default: Date.now() })
  @IsDate()
  date?: Date;
}
