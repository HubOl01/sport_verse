import { ViewsTraining } from "@prisma/client";

export class ViewsTrainingEntity implements ViewsTraining {
    id: number;
    userId: number;
    trainingPlanId: number;
    createdAt: Date;
}
