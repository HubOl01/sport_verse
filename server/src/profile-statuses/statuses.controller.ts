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
  @Get()
  @ApiOkResponse()
  findAll() {
    return this.statusesService.findAll();
  }
}
