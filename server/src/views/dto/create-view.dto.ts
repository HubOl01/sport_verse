import { ApiProperty } from "@nestjs/swagger"
import { IsInt } from "class-validator"

export class CreateViewDto {
    @ApiProperty()
    @IsInt()
    userId:number

    @ApiProperty()
    @IsInt()
    postId:number
}
