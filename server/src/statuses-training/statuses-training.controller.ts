import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatusesTrainingService } from './statuses-training.service';
import { CreateStatusesTrainingDto } from './dto/create-statuses-training.dto';
import { UpdateStatusesTrainingDto } from './dto/update-statuses-training.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('statuses-training')
@ApiTags('statuses-training')
export class StatusesTrainingController {
  constructor(
    private readonly statusesTrainingService: StatusesTrainingService,
  ) {}

  // @Post()
  // create(@Body() createStatusesTrainingDto: CreateStatusesTrainingDto) {
  //   return this.statusesTrainingService.create(createStatusesTrainingDto);
  // }

  @Get()
  @ApiOkResponse()
  findAll() {
    return this.statusesTrainingService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.statusesTrainingService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStatusesTrainingDto: UpdateStatusesTrainingDto) {
  //   return this.statusesTrainingService.update(+id, updateStatusesTrainingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.statusesTrainingService.remove(+id);
  // }
}
