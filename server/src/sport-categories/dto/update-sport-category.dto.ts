import { PartialType } from '@nestjs/swagger';
import { CreateSportCategoryDto } from './create-sport-category.dto';

export class UpdateSportCategoryDto extends PartialType(CreateSportCategoryDto) {}
