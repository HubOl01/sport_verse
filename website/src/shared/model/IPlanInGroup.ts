import { ITraining } from "./ITraining";

export interface IPlanInGroup {
  id?: number;
  title: string;
  desc: string;
  planAt: Date;
  planId: number;
  groupId: number;

  plan: ITraining;
}
