import { IPlanExercise } from "./IPlanExercise";
import { ISportType } from "./ISportType";
import { StatusPublish } from "./IStatusPublish";
import { ITrainingGroup } from "./ITrainingGroup";
import { IUser } from "./IUser";

export interface ITraining {
  id?: number;
  title: string;
  statusPublishId?: number;
  isPrivate?: number;
  description: string;
  date_created?: Date;
  userId: number;
  parentUserId?: number;
  parentPlanId?: number;
  parentGroupId?: number;
  parentPlanInGroupId?: number;
  date_start?: Date;
  date_end?: Date;
  statusTrainingId: number;
  sportTypeId: number;
  statusPublish?: StatusPublish;
  sportType?: ISportType;
  user?: IUser;
  parentUser?: IUser;
  parentGroup?: ITrainingGroup;

  PlanExercise?: IPlanExercise[];
  _count?: {
    LikeTraining: number;
  };
}
