import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LikeTrainingService } from './like-training.service';
import { CreateLikeTrainingDto } from './dto/create-like-training.dto';
import { UpdateLikeTrainingDto } from './dto/update-like-training.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LikeTrainingEntity } from './entities/like-training.entity';

@Controller('like-training')
@ApiTags('like-training')
export class LikeTrainingController {
  constructor(private readonly likeTrainingService: LikeTrainingService) {}

  @Post()
  @ApiCreatedResponse()
  create(@Body() createLikeTrainingDto: CreateLikeTrainingDto) {
    return this.likeTrainingService.create(createLikeTrainingDto);
  }

  @Get()
  @ApiOkResponse({ type: LikeTrainingEntity, isArray: true })
  findAll() {
    return this.likeTrainingService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: LikeTrainingEntity, isArray: false })
  findOne(@Param('id') id: string) {
    return this.likeTrainingService.findOne(+id);
  }
  @Get('/likesCount/:planId')
  @ApiOkResponse({ type: LikeTrainingEntity, isArray: false })
  findLikeCount(@Param('planId') planId: string) {
    return this.likeTrainingService.findLikeCount(+planId);
  }
  @Get('/training/:planId/user/:userId')
  @ApiOkResponse()
  findPlanUser(
    @Param('planId') planId: string,
    @Param('userId') userId: string,
  ) {
    return this.likeTrainingService.findPlanUser(+userId, +planId);
  }

  @Patch(':id')
  @ApiCreatedResponse()
  update(
    @Param('id') id: string,
    @Body() updateLikeTrainingDto: UpdateLikeTrainingDto,
  ) {
    return this.likeTrainingService.update(+id, updateLikeTrainingDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.likeTrainingService.remove(+id);
  }
  @Delete('/training/:planId/user/:userId')
  @ApiOkResponse()
  deletePlanUser(
    @Param('planId') planId: string,
    @Param('userId') userId: string,
  ) {
    return this.likeTrainingService.deletePlanUser(+userId, +planId);
  }
}
