import { LikeTraining } from '@prisma/client';

export class LikeTrainingEntity implements LikeTraining {
  id: number;
  userId: number;
  trainingPlanId: number;
  createdAt: Date;
}
