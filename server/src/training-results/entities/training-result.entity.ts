import { TrainingResult } from '@prisma/client';

export class TrainingResultEntity implements TrainingResult {
  id: number;
  trainingPlanId: number;
  userId: number;
  groupInGroupId: number;
  date_start: Date;
  date_end: Date;
  createdAt: Date;
  comment: string;
  commentTrainer: string;
  difficulty: number;

}
