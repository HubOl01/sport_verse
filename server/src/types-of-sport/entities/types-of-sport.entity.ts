import { ApiProperty } from '@nestjs/swagger';
import { TypeOfSport } from '@prisma/client';
import { IsInt, IsString } from 'class-validator';

export class TypesOfSportEntity implements TypeOfSport {
  @IsInt()
  idTypeOfSport: number;

  @IsString()
  @ApiProperty()
  nameType: string;

  @ApiProperty()
  @IsString()
  colorType: string;
}
