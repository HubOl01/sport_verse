import { PartialType } from '@nestjs/swagger';
import { CreateViewsTrainingDto } from './create-views-training.dto';

export class UpdateViewsTrainingDto extends PartialType(CreateViewsTrainingDto) {}
