import { Injectable } from '@nestjs/common';
import { CreateLikeTrainingDto } from './dto/create-like-training.dto';
import { UpdateLikeTrainingDto } from './dto/update-like-training.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeTrainingService {
  constructor(private prisma: PrismaService) {}
  create(createLikeTrainingDto: CreateLikeTrainingDto) {
    return this.prisma.likeTraining.create({ data: createLikeTrainingDto });
  }

  findAll() {
    return this.prisma.likeTraining.findMany();
  }

  findOne(id: number) {
    return this.prisma.likeTraining.findUnique({ where: { id: id } });
  }
  findLikeCount(triningId: number) {
    return this.prisma.likeTraining.count({ where: { trainingPlanId: triningId } });
  }
  findPlanUser(idUser: number, idPlan: number) {
    return this.prisma.likeTraining.findUnique({
      where: {
        userId_trainingPlanId: {
          userId: idUser,
          trainingPlanId: idPlan,
        },
      },
    });
  }

  update(id: number, updateLikeTrainingDto: UpdateLikeTrainingDto) {
    return this.prisma.likeTraining.update({
      where: { id: id },
      data: updateLikeTrainingDto,
    });
  }

  remove(id: number) {
    return this.prisma.likeTraining.delete({ where: { id: id } });
  }
  deletePlanUser(idUser: number, idPlan: number) {
    return this.prisma.likeTraining.delete({
      where: {
        userId_trainingPlanId: {
          userId: idUser,
          trainingPlanId: idPlan,
        },
      },
    });
  }
}
