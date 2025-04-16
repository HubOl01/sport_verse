import { IAthleteInGroup } from "./IAthleteInGroup";
import { IProfile } from "./IProfile";
import { ITraining } from "./ITraining";
import { ISubscription } from "./ISubscription";

export interface IUser {
  id?: number;
  email: string;
  password: string;
  VKID?: string;
  username: string;
  createdAt?: Date;
  statusUser?: string;
  profile?: IProfile;
  TrainingPlan: ITraining[];
  athleteInGroups: IAthleteInGroup[];
  trainerInGroups: IAthleteInGroup[];
  subscriptions: ISubscription[];
  subscribers: ISubscription[];
}
