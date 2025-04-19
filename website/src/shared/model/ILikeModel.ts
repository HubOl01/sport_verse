import { ITraining } from "./ITraining";
import { IUser } from "./IUser";

export interface ILikeModel {
  id?: number;
  userId: number;
  trainingPlanId: number;
  createdAt?: Date;

  trainingPlan?: ITraining;
  user?: IUser;
}
