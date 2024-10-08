import { PlanExercise } from "@prisma/client";

export class PlanExerciseEntity implements PlanExercise {
    id: number;
    idPlanExercise: number;
    trainingPlanId: number;
    setTotal: number;
    repTotal: number;
    exerciseStatus: number;
    exerciseId: number;
}
