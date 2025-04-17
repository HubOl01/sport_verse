import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlanInGroupsService } from './plan-in-groups.service';
import { CreatePlanInGroupDto } from './dto/create-plan-in-group.dto';
import { UpdatePlanInGroupDto } from './dto/update-plan-in-group.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PlanInGroupEnity } from './entities/plan-in-group.entity';

@Controller('plan-in-groups')
@ApiTags('plan-in-groups')
export class PlanInGroupsController {
  constructor(private readonly planInGroupsService: PlanInGroupsService) {}

  @Post()
  @ApiCreatedResponse({ type: PlanInGroupEnity })
  create(@Body() createPlanInGroupDto: CreatePlanInGroupDto) {
    return this.planInGroupsService.create(createPlanInGroupDto);
  }

  @Get()
  @ApiOkResponse({ type: PlanInGroupEnity, isArray: true })
  findAll() {
    return this.planInGroupsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PlanInGroupEnity })
  findOne(@Param('id') id: string) {
    return this.planInGroupsService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: PlanInGroupEnity })
  update(
    @Param('id') id: string,
    @Body() updatePlanInGroupDto: UpdatePlanInGroupDto,
  ) {
    return this.planInGroupsService.update(+id, updatePlanInGroupDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PlanInGroupEnity })
  remove(@Param('id') id: string) {
    return this.planInGroupsService.remove(+id);
  }
}
