import { StatusProfile, StatusPublish } from '@prisma/client';

export class StatusEntity implements StatusProfile {
  id: number;
  title: string;
  desc: string;
  svg_image: string;
}
