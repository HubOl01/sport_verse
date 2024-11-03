import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusesTrainingDto {
  @ApiProperty({ required: true })
  title: string;
}
