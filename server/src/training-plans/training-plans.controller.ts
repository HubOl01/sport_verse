import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrainingPlansService } from './training-plans.service';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TrainingPlanEntity } from './entities/training-plan.entity';

@Controller('training-plans')
@ApiTags('training-plans')
export class TrainingPlansController {
  constructor(private readonly trainingPlansService: TrainingPlansService) {}

  @Post()
  @ApiCreatedResponse()
  create(@Body() createTrainingPlanDto: CreateTrainingPlanDto) {
    return this.trainingPlansService.create(createTrainingPlanDto);
  }

  @Get()
  @ApiOkResponse({ type: TrainingPlanEntity, isArray: true })
  findAll() {
    return this.trainingPlansService.findAll();
  }
  @Get('findAllPublic')
  @ApiOkResponse({ type: TrainingPlanEntity, isArray: true })
  findAllPublic() {
    return this.trainingPlansService.findAllPublic();
  }
  @Get('findAllPrivate')
  @ApiOkResponse({ type: TrainingPlanEntity, isArray: true })
  findAllPrivate() {
    return this.trainingPlansService.findAllPrivate();
  }

  @Get('getIdFirst')
  @ApiOkResponse()
  @ApiOkResponse({ type: TrainingPlanEntity, isArray: false })
  getIdFirst() {
    return this.trainingPlansService.getIdFirst();
  }

  @Get(':id')
  @ApiOkResponse({ type: TrainingPlanEntity, isArray: false })
  @ApiOkResponse()
  findOne(@Param('id') id: string) {
    return this.trainingPlansService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse()
  update(
    @Param('id') id: string,
    @Body() updateTrainingPlanDto: UpdateTrainingPlanDto,
  ) {
    return this.trainingPlansService.update(+id, updateTrainingPlanDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.trainingPlansService.remove(+id);
  }
}
