import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsString } from "class-validator";

export class CreateProfileDto {
    @IsString()
    @ApiProperty()
    status: string;
  
    @IsString()
    @ApiProperty()
    sport_type: string;
  
    @IsString()
    @ApiProperty()
    about: string;
  
    @IsDate()
    @ApiProperty()
    dateOfBirth: Date;
  
    @IsInt()
    @ApiProperty()
    userId: number;
}
