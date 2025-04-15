import { PartialType } from '@nestjs/swagger';
import { CreateAthleteInGroupDto } from './create-athlete-in-group.dto';

export class UpdateAthleteInGroupDto extends PartialType(CreateAthleteInGroupDto) {}
