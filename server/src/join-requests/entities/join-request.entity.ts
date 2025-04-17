import { JoinRequest } from "@prisma/client";

export class JoinRequestEntity implements JoinRequest {
    id: number;
    trainingGroupId: number;
    athleteId: number;
    status: string;
    createdAt: Date;
}
