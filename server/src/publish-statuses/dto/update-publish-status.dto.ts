import { PartialType } from '@nestjs/swagger';
import { CreatePublishStatusDto } from './create-publish-status.dto';

export class UpdatePublishStatusDto extends PartialType(CreatePublishStatusDto) {}
