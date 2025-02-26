import { PartialType } from '@nestjs/swagger';
import { CreateLikeTrainingDto } from './create-like-training.dto';

export class UpdateLikeTrainingDto extends PartialType(CreateLikeTrainingDto) {}
