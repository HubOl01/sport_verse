export interface IJoinRequest {
    id?: number;
    trainingGroupId: number;
    athleteId: number;
    status?: string;
    createdAt?: Date;
}