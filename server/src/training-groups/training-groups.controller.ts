import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrainingGroupsService } from './training-groups.service';
import { CreateTrainingGroupDto } from './dto/create-training-group.dto';
import { UpdateTrainingGroupDto } from './dto/update-training-group.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TrainingGroupEntity } from './entities/training-group.entity';

@Controller('training-groups')
@ApiTags('training-groups')
export class TrainingGroupsController {
  constructor(private readonly trainingGroupsService: TrainingGroupsService) {}

  @Post()
  @ApiCreatedResponse({ type: TrainingGroupEntity })
  create(@Body() createTrainingGroupDto: CreateTrainingGroupDto) {
    return this.trainingGroupsService.create(createTrainingGroupDto);
  }

  @Get()
  @ApiOkResponse({ type: TrainingGroupEntity, isArray: true })
  findAll() {
    return this.trainingGroupsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: TrainingGroupEntity })
  findOne(@Param('id') id: string) {
    return this.trainingGroupsService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: TrainingGroupEntity })
  update(
    @Param('id') id: string,
    @Body() updateTrainingGroupDto: UpdateTrainingGroupDto,
  ) {
    return this.trainingGroupsService.update(+id, updateTrainingGroupDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TrainingGroupEntity })
  remove(@Param('id') id: string) {
    return this.trainingGroupsService.remove(+id);
  }
}
