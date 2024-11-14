import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ExerciseEntity } from './entities/exercise.entity';

@Controller('exercises')
@ApiTags('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @ApiCreatedResponse()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get()
  @ApiOkResponse({ type: ExerciseEntity, isArray: true })
  findAll() {
    return this.exercisesService.findAll();
  }

  @Get('findAllPublic')
  @ApiOkResponse({ type: ExerciseEntity, isArray: true })
  findAllPublic() {
    return this.exercisesService.findAllPublic();
  }

  @Get(':name')
  @ApiOkResponse()
  findOneExercise(@Param('name') name: string) {
    return this.exercisesService.findOneExercise(name);
  }

  @Get(':id')
  @ApiOkResponse()
  findOne(@Param('id') id: string) {
    return this.exercisesService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse()
  update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return this.exercisesService.update(+id, updateExerciseDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(+id);
  }
}
