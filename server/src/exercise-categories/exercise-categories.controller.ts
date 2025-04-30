import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExerciseCategoriesService } from './exercise-categories.service';
import { CreateExerciseCategoryDto } from './dto/create-exercise-category.dto';
import { UpdateExerciseCategoryDto } from './dto/update-exercise-category.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ExerciseCategoryEntity } from './entities/exercise-category.entity';

@Controller('exercise-categories')
@ApiTags('exercise-categories')
export class ExerciseCategoriesController {
  constructor(
    private readonly exerciseCategoriesService: ExerciseCategoriesService,
  ) {}
  @ApiOkResponse({ type: ExerciseCategoryEntity, isArray: true })
  @Get()
  findAll() {
    return this.exerciseCategoriesService.findAll();
  }
  @ApiOkResponse({ type: ExerciseCategoryEntity, isArray: false })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseCategoriesService.findOne(+id);
  }
}
