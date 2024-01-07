import { ApiProperty } from "@nestjs/swagger";
import { Post } from "@prisma/client";
import { IsOptional } from "class-validator";

export class PostEntity implements Post{
        @ApiProperty()
        @IsOptional()
        idPost: number;

        @ApiProperty({required: false, default: 0})
        @IsOptional()
        userId: number
    
        @ApiProperty({required: false, default: 0})
        @IsOptional()
        communityId: number;
    
        @ApiProperty({required: false, example: 'Название поста'})
        title: string
        
        @ApiProperty({required: false, example: 'Описание поста'})
        description: string
    
        @ApiProperty()
        createdAt: Date
    
        @ApiProperty()
        updatedAt: Date
    
}
