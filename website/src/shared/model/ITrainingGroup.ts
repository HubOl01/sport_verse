import { IAthleteInGroup } from "./IAthleteInGroup";
import { ISportType } from "./ISportType";

export interface ITrainingGroup {
  id?: number;
  title: string;
  desc: string;
  trainerId: number;
  createdAt?: Date;
  sportTypeId: number;
  isPrivate?: number;

  trainingGroup?: ITrainingGroup[];
  athletes?: IAthleteInGroup[];
  sportType?: ISportType;
}
