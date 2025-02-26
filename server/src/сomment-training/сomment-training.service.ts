import { Injectable } from '@nestjs/common';
import { CreateСommentTrainingDto } from './dto/create-сomment-training.dto';
import { UpdateСommentTrainingDto } from './dto/update-сomment-training.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class СommentTrainingService {
  constructor(private prisma: PrismaService) {}
  create(createСommentTrainingDto: CreateСommentTrainingDto) {
    return this.prisma.commentTraining.create({
      data: createСommentTrainingDto,
    });
  }

  findAll() {
    return this.prisma.commentTraining.findMany({
      include: {
        user: true,
        replies: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.commentTraining.findUnique({
      where: { id },
      include: {
        user: true,
        replies: true,
      },
    });
  }

  update(id: number, updateСommentTrainingDto: UpdateСommentTrainingDto) {
    return this.prisma.commentTraining.update({
      where: { id },
      data: updateСommentTrainingDto,
    });
  }

  remove(id: number) {
    return this.prisma.commentTraining.delete({ where: { id } });
  }
}
