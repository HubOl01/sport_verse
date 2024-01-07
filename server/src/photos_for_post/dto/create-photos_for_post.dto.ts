import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePhotosForPostDto {
  @ApiProperty()
  @IsString()
  url_image: string;

  @ApiProperty()
  @IsInt()
  postId: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name_image?: string;
//   @ApiProperty({ required: false })
  @IsOptional()
  createdAt?: Date;
}
