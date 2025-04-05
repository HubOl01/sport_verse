import { Injectable } from '@nestjs/common';
import { CreatePlanExerciseDto } from './dto/create-plan-exercise.dto';
import { UpdatePlanExerciseDto } from './dto/update-plan-exercise.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlanExercisesService {
  constructor(private prisma: PrismaService) {}
  create(createPlanExerciseDto: CreatePlanExerciseDto) {
    return this.prisma.planExercise.create({ data: createPlanExerciseDto });
  }

  findAll() {
    return this.prisma.planExercise.findMany({
      include: {
        exercise: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  getIdFirst() {
    return this.prisma.planExercise.findFirst({
      orderBy: {
        id: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.planExercise.findUnique({ where: { id: id } });
  }

  findAllPlan(id: number) {
    return this.prisma.planExercise.findMany({ where: { trainingPlanId: id } });
  }

  update(id: number, updatePlanExerciseDto: UpdatePlanExerciseDto) {
    return this.prisma.planExercise.update({
      data: updatePlanExerciseDto,
      where: { id: id },
      include: {
        exercise: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.planExercise.delete({ where: { id: id } });
  }

  deleteAllExercises(trainingPlanId: number) { // удаление всех упражнений 
    // return this.prisma.planExercise.delete({ where: { id: id } });

    return this.prisma.planExercise.deleteMany({
      where: { trainingPlanId: trainingPlanId },
    });
  }
}
