import { PlanInGroup } from '@prisma/client';

export class PlanInGroupEnity implements PlanInGroup {
  id: number;
  title: string;
  desc: string;
  planAt: Date;
  planId: number;
  groupId: number;
}
