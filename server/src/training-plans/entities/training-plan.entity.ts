import { TrainingPlan } from '@prisma/client';

export class TrainingPlanEntity implements TrainingPlan {
  statusPublishId: number;
  id: number;
  title: string;
  statusPublish: number;
  description: string;
  date_created: Date;
  userId: number;
  SportTypeId: number;
  date_start: Date;
  date_end: Date;
  statusTraining: number;
  sportTypeId: number;
}
