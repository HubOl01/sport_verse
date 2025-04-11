import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ required: true })
  @IsString()
  name: string;
  dateOfBirth: Date;
  @ApiProperty({ required: true })
  startSportDate: Date;
  @ApiProperty({ required: true })
  @IsString()
  url_avatar: string;
  @ApiProperty({ required: true })
  @IsString()
  about: string;
  @ApiProperty({ required: false, default: 2 })
  @IsNumber()
  statusId: number;
  @ApiProperty({ required: false, default: 1 })
  @IsNumber()
  roleId: number;
  @IsBoolean()
  isVerified: boolean;
  @ApiProperty({ required: true })
  @IsNumber()
  userId: number;
  @ApiProperty({ required: true })
  sportCategoryId: number;
}
