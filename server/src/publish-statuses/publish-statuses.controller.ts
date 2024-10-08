import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PublishStatusesService } from './publish-statuses.service';
import { CreatePublishStatusDto } from './dto/create-publish-status.dto';
import { UpdatePublishStatusDto } from './dto/update-publish-status.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('publish-statuses')
@ApiTags('publish-statuses')
export class PublishStatusesController {
  constructor(
    private readonly publishStatusesService: PublishStatusesService,
  ) {}

  // @Post()
  // create(@Body() createPublishStatusDto: CreatePublishStatusDto) {
  //   return this.publishStatusesService.create(createPublishStatusDto);
  // }

  @Get()
  @ApiOkResponse()
  findAll() {
    return this.publishStatusesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.publishStatusesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePublishStatusDto: UpdatePublishStatusDto) {
  //   return this.publishStatusesService.update(+id, updatePublishStatusDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.publishStatusesService.remove(+id);
  // }
}
