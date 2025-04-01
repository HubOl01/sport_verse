import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommentTrainingService } from './comment-training.service';
import { CreateCommentTrainingDto } from './dto/create-comment-training.dto';
import { CommentTrainingEntity } from './entities/comment-training.entity';
import { UpdateCommentTrainingDto } from './dto/update-comment-training.dto';

@Controller('comment-training')
@ApiTags('comment-training')
export class CommentTrainingController {
  constructor(
    private readonly commentTrainingService: CommentTrainingService,
  ) {}

  @Post()
  @ApiCreatedResponse()
  create(@Body() createCommentTrainingDto: CreateCommentTrainingDto) {
    return this.commentTrainingService.create(createCommentTrainingDto);
  }

  @Get()
  @ApiOkResponse({ type: CommentTrainingEntity, isArray: true })
  findAll() {
    return this.commentTrainingService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CommentTrainingEntity, isArray: false })
  findOne(@Param('id') id: string) {
    return this.commentTrainingService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse()
  update(
    @Param('id') id: string,
    @Body() updateCommentTrainingDto: UpdateCommentTrainingDto,
  ) {
    return this.commentTrainingService.update(+id, updateCommentTrainingDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.commentTrainingService.remove(+id);
  }
}
