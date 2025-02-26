import { Injectable } from '@nestjs/common';
import { CreateViewsTrainingDto } from './dto/create-views-training.dto';
import { UpdateViewsTrainingDto } from './dto/update-views-training.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ViewsTrainingService {
  constructor(private prisma: PrismaService) {}
  create(createViewsTrainingDto: CreateViewsTrainingDto) {
    return this.prisma.viewsTraining.create({ data: createViewsTrainingDto });
  }

  findAll() {
    return this.prisma.viewsTraining.findMany();
  }

  findOne(id: number) {
    return this.prisma.viewsTraining.findUnique({ where: {id} });
  }

  update(id: number, updateViewsTrainingDto: UpdateViewsTrainingDto) {
    return this.prisma.viewsTraining.update({ where: {id}, data: updateViewsTrainingDto });
  }

  remove(id: number) {
    return this.prisma.viewsTraining.delete({ where: {id} });
  }
}
