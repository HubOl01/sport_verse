import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AthleteInGroupsService } from './athlete-in-groups.service';
import { CreateAthleteInGroupDto } from './dto/create-athlete-in-group.dto';
import { UpdateAthleteInGroupDto } from './dto/update-athlete-in-group.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AthleteInGroupEntity } from './entities/athlete-in-group.entity';

@Controller('athlete-in-groups')
@ApiTags('athlete-in-groups')
export class AthleteInGroupsController {
  constructor(
    private readonly athleteInGroupsService: AthleteInGroupsService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: AthleteInGroupEntity })
  create(@Body() createAthleteInGroupDto: CreateAthleteInGroupDto) {
    return this.athleteInGroupsService.create(createAthleteInGroupDto);
  }

  @Get()
  @ApiOkResponse({ type: AthleteInGroupEntity, isArray: true })
  findAll() {
    return this.athleteInGroupsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: AthleteInGroupEntity })
  findOne(@Param('id') id: string) {
    return this.athleteInGroupsService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: AthleteInGroupEntity })
  update(
    @Param('id') id: string,
    @Body() updateAthleteInGroupDto: UpdateAthleteInGroupDto,
  ) {
    return this.athleteInGroupsService.update(+id, updateAthleteInGroupDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: AthleteInGroupEntity })
  remove(@Param('id') id: string) {
    return this.athleteInGroupsService.remove(+id);
  }
}
