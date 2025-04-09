import { Injectable } from '@nestjs/common';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrainingPlansService {
  constructor(private prisma: PrismaService) {}
  create(createTrainingPlanDto: CreateTrainingPlanDto) {
    return this.prisma.trainingPlan.create({ data: createTrainingPlanDto });
  }
  findAll() {
    return this.prisma.trainingPlan.findMany({
      include: {
        statusPublish: true,
        sportType: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
  findAllFrontPublic() {
    return this.prisma.trainingPlan.findMany({
      where: { isPrivate: 0, statusPublishId: 2 },
      include: {
        statusPublish: true,
        sportType: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
  findAllSuccessPublic() {
    return this.prisma.trainingPlan.findMany({
      where: { isPrivate: 0, statusPublishId: 3 },
      include: {
        statusPublish: true,
        sportType: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
  findAllFailedPublic() {
    return this.prisma.trainingPlan.findMany({
      where: { isPrivate: 0, statusPublishId: 4 },
      include: {
        statusPublish: true,
        sportType: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
  findAllPublic() {
    return this.prisma.trainingPlan.findMany({
      where: { isPrivate: 0 },
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
        PlanExercise: {
          include: {
            exercise: true,
          },
        },
        StatusTraining: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
  findAllPrivate() {
    return this.prisma.trainingPlan.findMany({
      where: { isPrivate: 1 },
      include: {
        statusPublish: true,
        sportType: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
  getIdFirst() {
    return this.prisma.trainingPlan.findFirst({
      orderBy: {
        id: 'desc',
      },
    });
  }
  findOne(id: number) {
    return this.prisma.trainingPlan.findUnique({
      where: { id: id },
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
        PlanExercise: {
          include: {
            exercise: true,
          },
        },
        StatusTraining: true,
      },
    });
  }

  update(id: number, updateTrainingPlanDto: UpdateTrainingPlanDto) {
    return this.prisma.trainingPlan.update({
      data: updateTrainingPlanDto,
      where: { id: id },
    });
  }

  async remove(id: number) {
    const planExercises = await this.prisma.planExercise.findMany({
      where: { trainingPlanId: id },
    });
    for (const planExercise of planExercises) {
      await this.prisma.exerciseSet.deleteMany({
        where: { planExerciseId: planExercise.id },
      });
    }
    await this.prisma.planExercise.deleteMany({
      where: { trainingPlanId: id },
    });
    return this.prisma.trainingPlan.delete({
      where: { id: id },
    });
  }
}
