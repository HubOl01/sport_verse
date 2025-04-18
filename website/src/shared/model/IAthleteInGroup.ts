import { IUser } from "./IUser";

export interface IAthleteInGroup {
  id?: number;
  trainingGroupId: number;
  athleteId: number;
  joinedAt?: Date;

  athlete?: IUser;
}
