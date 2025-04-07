import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}
  create(createNewsDto: CreateNewsDto) {
    return this.prisma.news.create({ data: createNewsDto });
  }

  findAll() {
    return this.prisma.news.findMany();
  }

  findOne(id: number) {
    return this.prisma.news.findUnique({ where: { id: id } });
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return this.prisma.news.update({ data: updateNewsDto, where: { id: id } });
  }

  remove(id: number) {
    return this.prisma.news.delete({ where: { id: id } });
  }
}
