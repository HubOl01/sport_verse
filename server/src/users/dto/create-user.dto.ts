import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  //   @ApiProperty({ required: false })
  @ApiProperty({ required: true })
  @IsString()
  password: string;
  @ApiProperty({ required: false })
  @IsString()
  VKID: string;
  @ApiProperty({ required: true })
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  username: string;

  //   @ApiProperty({
  //     // required: false,
  //     // isArray: true,
  //     enum: $Enums.StatusUser,
  //   })
  @IsEnum($Enums.StatusUser, { each: true })
  statusUser: $Enums.StatusUser;
}
