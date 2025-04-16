import { ISportType } from "./ISportType";
import { StatusPublish } from "./IStatusPublish";
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
  date_start?: Date;
  date_end?: Date;
  statusTrainingId: number;
  sportTypeId: number;
  trainingGroupId?: number;
  statusPublish?: StatusPublish;
  sportType?: ISportType;
  user?: IUser;
  parentUser?: IUser;
}
