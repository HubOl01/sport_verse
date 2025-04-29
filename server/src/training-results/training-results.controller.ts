import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrainingResultsService } from './training-results.service';
import { CreateTrainingResultDto } from './dto/create-training-result.dto';
import { UpdateTrainingResultDto } from './dto/update-training-result.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TrainingResultEntity } from './entities/training-result.entity';

@Controller('training-results')
@ApiTags('training-results')
export class TrainingResultsController {
  constructor(
    private readonly trainingResultsService: TrainingResultsService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: TrainingResultEntity })
  create(@Body() createTrainingResultDto: CreateTrainingResultDto) {
    return this.trainingResultsService.create(createTrainingResultDto);
  }

  @Get()
  @ApiOkResponse({ type: TrainingResultEntity, isArray: true })
  findAll() {
    return this.trainingResultsService.findAll();
  }

  @Get('startAll/:userId')
  @ApiOkResponse({ type: TrainingResultEntity, isArray: true })
  findAllStartingUser(@Param('userId') userId: string) {
    return this.trainingResultsService.findAllStartingUser(+userId);
  }
  @Get('start/:userId')
  @ApiOkResponse({ type: TrainingResultEntity, isArray: false })
  findStartingUser(@Param('userId') userId: string) {
    return this.trainingResultsService.findStartingUser(+userId);
  }
  @Get('is-start-plan/:userId/:planId')
  @ApiOkResponse({ type: TrainingResultEntity })
  isStartingGroupsPlan(
    @Param('userId') userId: string,
    @Param('planId') planId: string,
  ) {
    return this.trainingResultsService.isStartingGroupsPlan(+userId, +planId);
  }
  @Get('start-plan/:userId/:planId')
  @ApiOkResponse({ type: TrainingResultEntity })
  f(
    @Param('userId') userId: string,
    @Param('planId') planId: string,
  ) {
    return this.trainingResultsService.findAllStartingUserPlan(+userId, +planId);
  }
  @Get('final/:userId')
  @ApiOkResponse({ type: TrainingResultEntity, isArray: true })
  findAllStoppingUser(@Param('userId') userId: string) {
    return this.trainingResultsService.findAllStoppingUser(+userId);
  }

  @Get('user/:userId')
  @ApiOkResponse({ type: TrainingResultEntity, isArray: true })
  findAllUser(@Param('userId') userId: string) {
    return this.trainingResultsService.findAllUser(+userId);
  }
  @Get(':id')
  @ApiOkResponse({ type: TrainingResultEntity })
  findOne(@Param('id') id: string) {
    return this.trainingResultsService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: TrainingResultEntity })
  update(
    @Param('id') id: string,
    @Body() updateTrainingResultDto: UpdateTrainingResultDto,
  ) {
    return this.trainingResultsService.update(+id, updateTrainingResultDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TrainingResultEntity })
  remove(@Param('id') id: string) {
    return this.trainingResultsService.remove(+id);
  }
}
