import { News } from '@prisma/client';

export class NewsEntity implements News {
  id: number;
  title: string;
  description: string;
  image: string;
  date: Date;
}
