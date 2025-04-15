import { AthleteInGroup } from "@prisma/client";

export class AthleteInGroupEntity implements AthleteInGroup {
    id: number;
    trainingGroupId: number;
    athleteId: number;
    joinedAt: Date;
}
