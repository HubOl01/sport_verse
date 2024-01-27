import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';
import { IsDate, IsInt, IsString } from 'class-validator';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsString()
  @ApiProperty()
  status: string;

  @IsString()
  @ApiProperty()
  sport_type: string;

  @IsString()
  @ApiProperty()
  about: string;

  @IsDate()
  @ApiProperty()
  dateOfBirth: Date;

  @IsInt()
  @ApiProperty()
  userId: number;
}
