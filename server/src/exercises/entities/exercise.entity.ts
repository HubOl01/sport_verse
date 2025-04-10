import { Exercise } from '@prisma/client';

export class ExerciseEntity implements Exercise {
  id: number;
  name: string;
  description: string;
  ExerciseCategoryId: number;
  userId: number;
  imageString: string;
  isPrivate: boolean;
}
