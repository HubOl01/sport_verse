import { Subscription } from "@prisma/client";

export class SubscriptionEntity implements Subscription {
    id: number;
    subscriberId: number;
    subscribedToId: number;
    createdAt: Date;

}
