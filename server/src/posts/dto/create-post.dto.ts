import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsOptional } from "class-validator";


export class CreatePostDto {
    @ApiProperty({required: false, default: 0})
    // @IsNotEmpty()
    @IsOptional()
    @IsInt()
    userId?: number;

    @ApiProperty({required: false, default: 0})
    // @IsNotEmpty()
    @IsOptional()
    @IsInt()
    communityId?: number

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
    createdAt?: Date

    @ApiProperty({required: false})
    @IsOptional()
    updatedAt?: Date
    
}
