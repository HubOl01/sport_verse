import { Profile } from "@prisma/client";

export class ProfileEntity implements Profile {
    id: number;
    name: string;
    dateOfBirth: Date;
    startSportDate: Date;
    endSportDate: Date;
    url_avatar: string;
    about: string;
    statusId: number;
    roleId: number;
    isVerified: boolean;
    sportCategoryId: number;
    userId: number;
}
