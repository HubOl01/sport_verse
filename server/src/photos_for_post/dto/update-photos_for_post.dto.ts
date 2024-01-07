import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePhotosForPostDto } from './create-photos_for_post.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdatePhotosForPostDto extends PartialType(CreatePhotosForPostDto) {
    @ApiProperty()
    @IsString()
    url_image: string;
  
    @ApiProperty()
    @IsInt()
    postId: number;

    // @ApiProperty({ required: false })
    @IsOptional()
    createdAt?: Date;
}
