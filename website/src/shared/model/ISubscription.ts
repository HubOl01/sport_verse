export interface ISubscription {
    id?: number;
    subscriberId: number;
    subscribedToId: number;
    createdAt?: Date;
}