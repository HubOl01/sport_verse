import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTypesOfSportDto } from './create-types-of-sport.dto';
import { IsString } from 'class-validator';

export class UpdateTypesOfSportDto extends PartialType(CreateTypesOfSportDto) {
  @IsString()
  @ApiProperty()
  nameType: string;

  @ApiProperty()
  @IsString()
  colorType: string;
}
