import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {

    @ApiProperty({required: false, example: 'Название поста'})
    @IsOptional()
    @IsNotEmpty()
    title?: string
    
    @ApiProperty({required: false, example: 'Описание поста'})
    @IsNotEmpty()
    @IsOptional()
    description?: string

    @ApiProperty({required: false})
    @IsOptional()
    updatedAt?: Date
}
