import { StatusTraining } from "@prisma/client";

export class StatusesTrainingEntity implements StatusTraining {
    id: number;
    title: string;
}
