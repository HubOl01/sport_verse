import { ProfileSportType } from "@prisma/client";

export class ProfileSportTypeEntity implements ProfileSportType {
    id: number;
    profileId: number;
    sportTypeId: number;
}
