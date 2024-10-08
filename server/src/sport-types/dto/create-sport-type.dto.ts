import { ApiProperty } from '@nestjs/swagger';

export class CreateSportTypeDto {
  //   id: number;
  @ApiProperty({ required: true })
  title: string;
  image: string;
}
