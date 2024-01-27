import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '@prisma/client';
import { IsDate, IsInt, IsString } from 'class-validator';

export class ProfileEntity implements Profile {
  @IsInt()
  idProfile: number;

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
