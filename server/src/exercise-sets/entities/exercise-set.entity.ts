import { ExerciseSet } from '@prisma/client';

export class ExerciseSetEntity implements ExerciseSet {
  id: number;
  planExerciseId: number;
  date: Date;
  duration: bigint;
  distance: number;
  weight: number;
  repetitions: number;
  calories_burned: number;
  route_gpx: string;
  stringType: string;
  stringUnit: string;
}
