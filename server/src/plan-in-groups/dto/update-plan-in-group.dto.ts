import { PartialType } from '@nestjs/swagger';
import { CreatePlanInGroupDto } from './create-plan-in-group.dto';

export class UpdatePlanInGroupDto extends PartialType(CreatePlanInGroupDto) {}
