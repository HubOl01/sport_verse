import { Injectable } from '@nestjs/common';
import { CreateTrainingResultDto } from './dto/create-training-result.dto';
import { UpdateTrainingResultDto } from './dto/update-training-result.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrainingResultsService {
  constructor(private prisma: PrismaService) {}
  create(createTrainingResultDto: CreateTrainingResultDto) {
    return this.prisma.trainingResult.create({ data: createTrainingResultDto });
  }

  findAll() {
    return this.prisma.trainingResult.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }
  findAllStartingUser(userId: number) {
    return this.prisma.trainingResult.findMany({
      where: { userId: userId, date_end: null },
      orderBy: {
        id: 'desc',
      },
    });
  }
  findStartingUser(userId: number) {
    return this.prisma.trainingResult.findFirst({
      where: { userId: userId, date_end: null },
      include: {
        trainingPlan: {
          include: {
            user: {
              select: {
                email: true,
                username: true,
                profile: {
                  select: {
                    url_avatar: true,
                    status: true,
                  },
                },
              },
            },
            statusPublish: true,
            sportType: true,
            parentUser: {
              select: {
                email: true,
                username: true,
                profile: {
                  select: {
                    url_avatar: true,
                    status: true,
                  },
                },
              },
            },
            parentGroup: true,
            PlanExercise: {
              include: {
                exercise: true,
              },
            },
            StatusTraining: true,
            _count: {
              select: {
                LikeTraining: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
  findAllStartingUserPlan(userId: number, planId: number) {
    return this.prisma.trainingResult.findFirst({
      where: { userId: userId, trainingPlanId: planId, date_end: null },
      orderBy: {
        id: 'desc',
      },
    });
  }
  async isStartingGroupsPlan(userId: number, planId: number): Promise<boolean> {
    const result = await this.prisma.trainingResult.findFirst({
      where: {
        userId: userId,
        trainingPlanId: planId,
        date_end: null,
      },
    });

    return !!result;
  }
  findAllStoppingUser(userId: number) {
    return this.prisma.trainingResult.findMany({
      where: { userId: userId, date_end: { not: null } },
      orderBy: {
        id: 'desc',
      },
    });
  }
  findAllUser(userId: number) {
    return this.prisma.trainingResult.findMany({
      where: { userId: userId },
      orderBy: {
        id: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.trainingResult.findUnique({ where: { id: id } });
  }

  update(id: number, updateTrainingResultDto: UpdateTrainingResultDto) {
    return this.prisma.trainingResult.update({
      data: updateTrainingResultDto,
      where: { id: id },
    });
  }

  remove(id: number) {
    return this.prisma.trainingResult.delete({ where: { id: id } });
  }
}
