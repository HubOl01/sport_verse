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
    });
  }

  findOne(id: number) {
    return this.prisma.planExercise.findUnique({ where: { id: id } });
  }

  update(id: number, updatePlanExerciseDto: UpdatePlanExerciseDto) {
    return this.prisma.planExercise.update({
      data: updatePlanExerciseDto,
      where: { id: id },
    });
  }

  remove(id: number) {
    return this.prisma.planExercise.delete({ where: { id: id } });
  }
}
