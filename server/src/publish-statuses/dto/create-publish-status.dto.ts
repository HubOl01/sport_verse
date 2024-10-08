import { ApiProperty } from "@nestjs/swagger";

export class CreatePublishStatusDto {
    @ApiProperty({ required: true })
    title: string;
}
