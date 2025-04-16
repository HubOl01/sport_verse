import { IUser } from "./IUser";

export interface ISubscription {
  id?: number;
  subscriberId: number;
  subscribedToId: number;
  createdAt?: Date;

  subscriber?: IUser;
  subscribedTo?: IUser;
}
