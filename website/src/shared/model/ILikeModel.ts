import { ITraining } from "./ITraining";

export interface ILikeModel {
  id?: number;
  userId: number;
  trainingPlanId: number;
  createdAt?: Date;

  trainingPlan?: ITraining[];
}
