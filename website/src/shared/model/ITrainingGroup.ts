import { IAthleteInGroup } from "./IAthleteInGroup";
import { IJoinRequest } from "./IJoinRequest";
import { IPlanInGroup } from "./IPlanInGroup";
import { ISportType } from "./ISportType";
import { IUser } from "./IUser";

export interface ITrainingGroup {
  id?: number;
  title: string;
  desc: string;
  trainerId: number;
  createdAt?: Date;
  sportTypeId: number;
  isPrivate?: number;

  trainer?: IUser;
  PlanInGroup?: IPlanInGroup[];
  athletes?: IAthleteInGroup[];
  sportType?: ISportType;
  joinRequest?: IJoinRequest[];
}
