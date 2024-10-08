import { PartialType } from '@nestjs/swagger';
import { CreatePlanExerciseDto } from './create-plan-exercise.dto';

export class UpdatePlanExerciseDto extends PartialType(CreatePlanExerciseDto) {}
