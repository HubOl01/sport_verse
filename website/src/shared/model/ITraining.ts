import { ISportType } from "./ISportType";
import { StatusPublish } from "./IStatusPublish";

export interface ITraining {
  id?: number;
  title: string;
  statusPublishId?: number;
  description: string;
  date_created?: Date;
  userId: number;
  date_start?: Date;
  date_end?: Date;
  statusTrainingId: number;
  sportTypeId: number;
  statusPublish?: StatusPublish;
  sportType?: ISportType;
}
