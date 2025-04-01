import { PartialType } from '@nestjs/swagger';
import { CreateCommentTrainingDto } from './create-comment-training.dto';

export class UpdateCommentTrainingDto extends PartialType(
  CreateCommentTrainingDto,
) {}
