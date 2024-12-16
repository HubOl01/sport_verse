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

  // remove(id: number) {
  //   return this.prisma.trainingPlan.delete({ where: { id: id } });
  // }

  async remove(id: number) {
    // Шаг 1: Получаем все PlanExercises, связанные с TrainingPlan
    const planExercises = await this.prisma.planExercise.findMany({
      where: { trainingPlanId: id },
    });

    // Шаг 2: Удаляем все ExerciseSet, связанные с PlanExercises
    for (const planExercise of planExercises) {
      await this.prisma.exerciseSet.deleteMany({
        where: { planExerciseId: planExercise.id },
      });
    }

    // Шаг 3: Удаляем все PlanExercises
    await this.prisma.planExercise.deleteMany({
      where: { trainingPlanId: id },
    });

    // Шаг 4: Удаляем TrainingPlan
    return this.prisma.trainingPlan.delete({
      where: { id: id },
    });
  }
}
