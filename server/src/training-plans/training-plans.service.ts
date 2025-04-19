import { Injectable } from '@nestjs/common';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { exercises } from '../prisma/data/exercises';

@Injectable()
export class TrainingPlansService {
  constructor(private prisma: PrismaService) {}
  create(createTrainingPlanDto: CreateTrainingPlanDto) {
    return this.prisma.trainingPlan.create({ data: createTrainingPlanDto });
  }
  findAll() {
    return this.prisma.trainingPlan.findMany({
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
        sportType: true,
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
      orderBy: {
        id: 'desc',
      },
    });
  }

  findAllPublicUser(idUser: number) {
    return this.prisma.trainingPlan.findMany({
      where: { isPrivate: 0, userId: idUser },
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
      orderBy: {
        LikeTraining: {
          _count: 'desc',
        },
      },
    });
  }

  findAllUser(idUser: number) {
    return this.prisma.trainingPlan.findMany({
      where: { userId: idUser },
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
        sportType: true,
        PlanExercise: {
          include: {
            exercise: true,
            ExerciseSet: true,
          },
        },
        StatusTraining: true,
        _count: {
          select: {
            LikeTraining: true,
          },
        },
      },
    });
  }
  async checkExistingPlan(
    originalPlanId: number,
    targetUserId: number,
    parentGroupId: number,
    parentPlanInGroupId: number,
  ) {
    // Поиск по originalPlanId, targetUserId, parentGroupId и parentPlanInGroupId
    const existingCopy = await this.prisma.trainingPlan.findFirst({
      where: {
        userId: targetUserId,
        parentPlanId: originalPlanId,
        parentGroupId: parentGroupId,
        parentPlanInGroupId: parentPlanInGroupId,
      },
    });
  
    return existingCopy; // Вернёт найденный план или null, если не найден
  }
  

  async copyPlanToUser(
    originalPlanId: number,
    targetUserId: number,
    parentGroupId: number,
    parentPlanInGroupId: number,
  ) {
    const originalPlan = await this.prisma.trainingPlan.findUnique({
      where: { id: originalPlanId },
      include: {
        PlanExercise: {
          include: {
            ExerciseSet: true,
          },
        },
      },
    });

    if (!originalPlan) {
      throw new Error('Original training plan not found');
    }

    // 🔍 Проверка: не существует ли уже такой план
    const existingCopy = await this.prisma.trainingPlan.findFirst({
      where: {
        userId: targetUserId,
        parentPlanId: originalPlanId,
        parentGroupId: parentGroupId,
        parentPlanInGroupId: parentPlanInGroupId,
      },
    });

    if (existingCopy) {
      // Если уже существует — возвращаем его, не создавая новую копию
      return existingCopy;
    }

    // 🆕 Шаг 1: создать копию плана
    const copiedPlan = await this.prisma.trainingPlan.create({
      data: {
        title: originalPlan.title,
        description: originalPlan.description,
        isPrivate: 1,
        date_created: new Date(),
        date_start: originalPlan.date_start,
        date_end: originalPlan.date_end,
        statusPublishId: originalPlan.statusPublishId,
        statusTrainingId: originalPlan.statusTrainingId,
        sportTypeId: originalPlan.sportTypeId,
        userId: targetUserId,
        parentUserId: originalPlan.userId,
        parentPlanId: originalPlan.id,
        parentGroupId: parentGroupId,
        parentPlanInGroupId: parentPlanInGroupId,
      },
    });

    // 🔁 Шаг 2: скопировать PlanExercise и ExerciseSet
    for (const originalExercise of originalPlan.PlanExercise) {
      const copiedPlanExercise = await this.prisma.planExercise.create({
        data: {
          trainingPlanId: copiedPlan.id,
          setTotal: originalExercise.setTotal,
          repTotal: originalExercise.repTotal,
          exerciseStatus: originalExercise.exerciseStatus,
          exerciseId: originalExercise.exerciseId,
        },
      });

      for (const set of originalExercise.ExerciseSet) {
        await this.prisma.exerciseSet.create({
          data: {
            planExerciseId: copiedPlanExercise.id,
            date: set.date,
            duration: set.duration,
            distance: set.distance,
            weight: set.weight,
            repetitions: set.repetitions,
            calories_burned: set.calories_burned,
            route_gpx: set.route_gpx,
            stringType: set.stringType,
            stringUnit: set.stringUnit,
          },
        });
      }
    }

    return copiedPlan;
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
