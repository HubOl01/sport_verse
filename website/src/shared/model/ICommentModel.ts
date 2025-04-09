import { IUser } from "./IUser";

export interface ICommentModel {
  id?: number;
  content: string;
  userId?: number;
  trainingPlanId?: number;
  createdAt?: Date;
  parentCommentId?: number;
  user?: IUser;
  replies?: ICommentModel[];
}
