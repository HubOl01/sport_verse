export interface IExercise {
  id?: number;
  name: string;
  description: string;
  ExerciseCategoryId: number;
  userId?: number;
  imageString?: string;
  isPrivate: boolean;
}
