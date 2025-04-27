export class CreateTrainingResultDto {
  desc: string;
  userId: number;
  date_start: Date;
  date_end: Date;
  comment: string;
  createdAt: Date;
  groupInGroupId: number;
  trainingPlanId: number;
  duration: number;
  difficulty: number;
}
