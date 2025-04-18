import { TrainingResult } from "@prisma/client";

export class TrainingResultEntity implements TrainingResult {
    id: number;
    trainingPlanId: number;
    date_end: Date;
    duration: number;
    difficulty: number;
}
