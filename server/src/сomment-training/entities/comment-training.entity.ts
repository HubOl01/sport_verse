import { CommentTraining } from '@prisma/client';

export class CommentTrainingEntity implements CommentTraining {
  id: number;
  content: string;
  userId: number;
  trainingPlanId: number;
  createdAt: Date;
  parentCommentId: number;
}
