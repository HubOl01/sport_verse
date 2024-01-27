import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsString()
    @ApiProperty()
    nameCategory: string;
  
    @IsString()
    @ApiProperty()
    colorCategory: string;
}
