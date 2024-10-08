import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('statuses')
@ApiTags('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  // @Post()
  // create(@Body() createStatusDto: CreateStatusDto) {
  //   return this.statusesService.create(createStatusDto);
  // }

  @Get()
  @ApiOkResponse()
  findAll() {
    return this.statusesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.statusesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
  //   return this.statusesService.update(+id, updateStatusDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.statusesService.remove(+id);
  // }
}
