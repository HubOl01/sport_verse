import { PartialType } from '@nestjs/swagger';
import { CreateСommentTrainingDto } from './create-сomment-training.dto';

export class UpdateСommentTrainingDto extends PartialType(CreateСommentTrainingDto) {}
