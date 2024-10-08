import { Exercise } from "@prisma/client";

export class ExerciseEntity implements Exercise {
    id: number;
    planExerciseId: number;
    name: string;
    description: string;
    ExerciseCategoryId: number;
    imageString: string;
}
