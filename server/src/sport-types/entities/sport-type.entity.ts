import { SportType } from '@prisma/client';

export class SportTypeEntity implements SportType {
  id: number;
  title: string;
  image: string;
}
