import { ExerciseCategory } from '@prisma/client';

export class ExerciseCategoryEntity implements ExerciseCategory {
  id: number;
  title: string;
}
