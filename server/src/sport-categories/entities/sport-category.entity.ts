import { SportCategory } from '@prisma/client';

export class SportCategoryEntity implements SportCategory {
  id: number;
  title: string;
  image: string;
}
