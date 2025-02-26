import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { СommentTrainingService } from './сomment-training.service';
import { CreateСommentTrainingDto } from './dto/create-сomment-training.dto';
import { UpdateСommentTrainingDto } from './dto/update-сomment-training.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { СommentTrainingEntity } from './entities/сomment-training.entity';

@Controller('сomment-training')
@ApiTags('сomment-training')
export class СommentTrainingController {
  constructor(
    private readonly сommentTrainingService: СommentTrainingService,
  ) {}

  @Post()
  @ApiCreatedResponse()
  create(@Body() createСommentTrainingDto: CreateСommentTrainingDto) {
    return this.сommentTrainingService.create(createСommentTrainingDto);
  }

  @Get()
  @ApiOkResponse({ type: СommentTrainingEntity, isArray: true })
  findAll() {
    return this.сommentTrainingService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: СommentTrainingEntity, isArray: false })
  findOne(@Param('id') id: string) {
    return this.сommentTrainingService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse()
  update(
    @Param('id') id: string,
    @Body() updateСommentTrainingDto: UpdateСommentTrainingDto,
  ) {
    return this.сommentTrainingService.update(+id, updateСommentTrainingDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.сommentTrainingService.remove(+id);
  }
}
