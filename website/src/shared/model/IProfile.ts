import { IRoleProfile } from "./IRoleProfile";
import { ISportCategory } from "./ISportCategory";
import { ISportType } from "./ISportType";
import { IStatusProfile } from "./IStatusProfile";

export interface IProfile {
  id?: number;
  name: string;
  dateOfBirth?: Date;
  startSportDate: Date;
  endSportDate?: Date;
  url_avatar: string;
  about: string;
  statusId: number;
  roleId: number;
  sportCategoryId: number;
  isVerified?: boolean;
  userId: number;
  status?: IStatusProfile;
  role?: IRoleProfile;
  sportType?: ISportType;
  sportCategory?: ISportCategory;
}
