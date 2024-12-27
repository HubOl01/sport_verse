import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SportTypesService } from './sport-types.service';
import { CreateSportTypeDto } from './dto/create-sport-type.dto';
import { UpdateSportTypeDto } from './dto/update-sport-type.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('sport-types')
@ApiTags('sport-types')
export class SportTypesController {
  constructor(private readonly sportTypesService: SportTypesService) {}
  @Get()
  @ApiOkResponse()
  findAll() {
    return this.sportTypesService.findAll();
  }
}
