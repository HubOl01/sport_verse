export interface ITrainingResult {
  id?: number;
  trainingPlanId: number;
  userId: number;
  groupInGroupId?: number;
  date_start?: Date;
  date_end?: Date;
  createdAt?: Date;
  comment: string;
  difficulty: number;
}
