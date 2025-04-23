import { ViewsTraining } from "@prisma/client";

export class ViewsTrainingEntity implements ViewsTraining {
    id: number;
    userId: number;
    trainingPlanId: number;
    ip: string;
    visitorId: string;
    createdAt: Date;
}
