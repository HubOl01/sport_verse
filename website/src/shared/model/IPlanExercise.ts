import { IExercise } from "./IExercise";
import { IExerciseSet } from './IExerciseSet';

export interface IPlanExercise {
  id?: number;
  idPlanExercise?: number;
  trainingPlanId: number;
  setTotal: number;
  repTotal: number;
  exerciseStatus: number;
  exerciseId: number;

  
  
  exercise?: IExercise;
  ExerciseSet?: IExerciseSet[];
}
