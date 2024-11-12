export interface IExercise {
  id?: number;
  name: string;
  description: string;
  ExerciseCategoryId: number;
  imageString?: string;
  isPrivate: boolean;
}
