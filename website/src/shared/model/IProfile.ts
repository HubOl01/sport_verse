import { IRoleProfile } from "./IRoleProfile";
import { ISportType } from "./ISportType";
import { IStatusProfile } from "./IStatusProfile";

export interface IProfile {
  id?: number;
  name: string;
  dateOfBirth?: Date;
  url_avatar: string;
  about: string;
  statusId: number;
  roleId: number;
  isVerified?: boolean;
  userId: number;
  status?: IStatusProfile;
  role?: IRoleProfile;
  sportType?: ISportType;
}
