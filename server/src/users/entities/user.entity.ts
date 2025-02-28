import { $Enums, User } from "@prisma/client";

export class UserEntity implements User{
    id: number;
    email: string;
    password: string;
    VKID: string;
    username: string;
    createdAt: Date;
    statusUser: $Enums.StatusUser;
}
