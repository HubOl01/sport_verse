import { ApiProperty } from "@nestjs/swagger";
import { Photo_for_post } from "@prisma/client";
import { IsInt, IsOptional, IsString } from "class-validator";

export class PhotosForPostEntity implements Photo_for_post {
    @ApiProperty({ required: false })
    idPhoto: number;

    @ApiProperty()
    @IsString()
    url_image: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    type: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    name_image: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    userId: number;
    @ApiProperty()
    @IsInt()
    postId: number;
  
    @ApiProperty({ required: false })
    @IsOptional()
    createdAt: Date;

}
