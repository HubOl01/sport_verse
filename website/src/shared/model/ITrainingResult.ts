export interface ITrainingResult {
  id?: number;
  trainingPlanId: number;
  date_end?: Date;
  duration: bigint;
  difficulty?: number;
}
