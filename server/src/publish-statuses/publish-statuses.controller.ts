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
  @Get()
  @ApiOkResponse()
  findAll() {
    return this.publishStatusesService.findAll();
  }
}
