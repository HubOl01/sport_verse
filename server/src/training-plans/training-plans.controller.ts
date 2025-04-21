import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrainingPlansService } from './training-plans.service';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TrainingPlanEntity } from './entities/training-plan.entity';

@Controller('training-plans')
@ApiTags('training-plans')
export class TrainingPlansController {
  constructor(private readonly trainingPlansService: TrainingPlansService) {}

  @Post()
  @ApiCreatedResponse()
  create(@Body() createTrainingPlanDto: CreateTrainingPlanDto) {
    return this.trainingPlansService.create(createTrainingPlanDto);
  }

  @Get()
  @ApiOkResponse({ type: TrainingPlanEntity, isArray: true })
  findAll() {
    return this.trainingPlansService.findAll();
  }
  @Get('findAllPublic')
  @ApiOkResponse({ type: TrainingPlanEntity, isArray: true })
  findAllPublic() {
    return this.trainingPlansService.findAllPublic();
  }
  @Get('findAllPublic/:idUser')
  @ApiOkResponse({ type: TrainingPlanEntity, isArray: true })
  findAllPublicUser(@Param('idUser') idUser: string) {
    return this.trainingPlansService.findAllPublicUser(+idUser);
  }
  @Get('findAllUser/:idUser')
  @ApiOkResponse({ type: TrainingPlanEntity, isArray: true })
  findAllUser(@Param('idUser') idUser: string) {
    return this.trainingPlansService.findAllUser(+idUser);
  }

  @Get('getIdFirst')
  @ApiOkResponse()
  @ApiOkResponse({ type: TrainingPlanEntity, isArray: false })
  getIdFirst() {
    return this.trainingPlansService.getIdFirst();
  }

  @Get(':id')
  @ApiOkResponse({ type: TrainingPlanEntity, isArray: false })
  @ApiOkResponse()
  findOne(@Param('id') id: string) {
    return this.trainingPlansService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse()
  update(
    @Param('id') id: string,
    @Body() updateTrainingPlanDto: UpdateTrainingPlanDto,
  ) {
    return this.trainingPlansService.update(+id, updateTrainingPlanDto);
  }

  @Post(
    'copyGroup/:parentGroupId/:parentPlanInGroupId/:originalPlanId/:targetUserId',
  )
  @ApiCreatedResponse()
  copyPlanToUserGroup(
    @Param('originalPlanId') originalPlanId: string,
    @Param('targetUserId') targetUserId: string,
    @Param('parentGroupId') parentGroupId: string,
    @Param('parentPlanInGroupId') parentPlanInGroupId: string,
  ) {
    return this.trainingPlansService.copyPlanToUserGroup(
      +originalPlanId,
      +targetUserId,
      +parentGroupId,
      +parentPlanInGroupId,
    );
  }
  @Get(
    'checkGroup/:parentGroupId/:parentPlanInGroupId/:originalPlanId/:targetUserId',
  )
  @ApiOkResponse()
  checkExistingPlanGroup(
    @Param('originalPlanId') originalPlanId: string,
    @Param('targetUserId') targetUserId: string,
    @Param('parentGroupId') parentGroupId: string,
    @Param('parentPlanInGroupId') parentPlanInGroupId: string,
  ) {
    return this.trainingPlansService.checkExistingPlanGroup(
      +originalPlanId,
      +targetUserId,
      +parentGroupId,
      +parentPlanInGroupId,
    );
  }

  @Post('copyUser/:originalPlanId/:targetUserId')
  @ApiCreatedResponse()
  copyPlanToUser(
    @Param('originalPlanId') originalPlanId: string,
    @Param('targetUserId') targetUserId: string,
  ) {
    return this.trainingPlansService.copyPlanToUser(
      +originalPlanId,
      +targetUserId,
    );
  }
  @Get('checkUser/:originalPlanId/:targetUserId')
  @ApiOkResponse()
  checkExistingPlanUser(
    @Param('originalPlanId') originalPlanId: string,
    @Param('targetUserId') targetUserId: string,
  ) {
    return this.trainingPlansService.checkExistingPlanUser(
      +originalPlanId,
      +targetUserId,
    );
  }
  @Post('copy/:originalPlanId/:targetUserId')
  @ApiCreatedResponse()
  copyPlan(
    @Param('originalPlanId') originalPlanId: string,
    @Param('targetUserId') targetUserId: string,
  ) {
    return this.trainingPlansService.copyPlan(+originalPlanId, +targetUserId);
  }
  @Get('check/:originalPlanId/:targetUserId')
  @ApiOkResponse()
  checkExistingPlan(
    @Param('originalPlanId') originalPlanId: string,
    @Param('targetUserId') targetUserId: string,
  ) {
    return this.trainingPlansService.checkExistingPlan(
      +originalPlanId,
      +targetUserId,
    );
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.trainingPlansService.remove(+id);
  }
}
