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

  // @Post()
  // create(@Body() createExerciseCategoryDto: CreateExerciseCategoryDto) {
  //   return this.exerciseCategoriesService.create(createExerciseCategoryDto);
  // }

  @ApiOkResponse({ type: ExerciseCategoryEntity, isArray: true })
  @Get()
  findAll() {
    return this.exerciseCategoriesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.exerciseCategoriesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateExerciseCategoryDto: UpdateExerciseCategoryDto) {
  //   return this.exerciseCategoriesService.update(+id, updateExerciseCategoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.exerciseCategoriesService.remove(+id);
  // }
}
