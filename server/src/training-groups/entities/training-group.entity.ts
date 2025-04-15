import { TrainingGroup } from "@prisma/client";

export class TrainingGroupEntity implements TrainingGroup {
    id: number;
    title: string;
    desc: string;
    trainerId: number;
    createdAt: Date;
}
