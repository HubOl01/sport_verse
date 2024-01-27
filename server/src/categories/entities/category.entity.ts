import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { IsInt, IsString } from 'class-validator';

export class CategoryEntity implements Category {
  @IsInt()
  idCategory: number;

  @IsInt()
  trainingPlanId: number;

  @IsString()
  @ApiProperty()
  nameCategory: string;

  @IsString()
  @ApiProperty()
  colorCategory: string;
}
