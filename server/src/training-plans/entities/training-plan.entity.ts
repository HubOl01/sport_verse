import { TrainingPlan } from '@prisma/client';

export class TrainingPlanEntity implements TrainingPlan {
  statusPublishId: number;
  id: number;
  title: string;
  statusPublish: number;
  isPrivate: number;
  description: string;
  date_created: Date;
  userId: number;
  parentUserId: number;
  date_start: Date;
  date_end: Date;
  statusTrainingId: number;
  sportTypeId: number;
  trainingGroupId: number;
}
