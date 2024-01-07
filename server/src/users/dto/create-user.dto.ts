import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: false, default: 'test@test.tt' })
  @IsNotEmpty()
  @IsString()
  email?: string;

  @ApiProperty({ example: 'test' })
  @IsNotEmpty()
  @IsString()
  username: string = 'test';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  idUsername?: string;

  @ApiProperty({
    required: false,
    default:
      'https://sun6-20.userapi.com/impg/Pu7YGIlBWPmDkiuzAEDCvKRx4KWScdw7Bquizg/KQjrBVk8hL8.jpg?size=1024x1024&quality=96&sign=7efd05f6ab573527e8a2fbdbc47ddf93&type=album',
  })
  url_avatar?: string =
    'https://sun6-20.userapi.com/impg/Pu7YGIlBWPmDkiuzAEDCvKRx4KWScdw7Bquizg/KQjrBVk8hL8.jpg?size=1024x1024&quality=96&sign=7efd05f6ab573527e8a2fbdbc47ddf93&type=album';

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  isCoach: boolean = false;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  isBan?: boolean = false;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  isOffical?: boolean = false;
  
  @ApiProperty({ required: false })
  @IsOptional()
  createdAt?: Date;
}
