import { PartialType } from '@nestjs/swagger';
import { CreateStatusesTrainingDto } from './create-statuses-training.dto';

export class UpdateStatusesTrainingDto extends PartialType(CreateStatusesTrainingDto) {}
