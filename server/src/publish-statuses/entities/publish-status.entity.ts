import { StatusPublish } from "@prisma/client";

export class PublishStatusEntity implements StatusPublish {
    id: number;
    title: string;
}
