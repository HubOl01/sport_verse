import { Injectable } from '@nestjs/common';
import { CreateExerciseSetDto } from './dto/create-exercise-set.dto';
import { UpdateExerciseSetDto } from './dto/update-exercise-set.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { exercises } from '../prisma/data/exercises';

@Injectable()
export class ExerciseSetsService {
  constructor(private prisma: PrismaService) {}
  create(createExerciseSetDto: CreateExerciseSetDto) {
    return this.prisma.exerciseSet.create({ data: createExerciseSetDto });
  }

  findAll() {
    return this.prisma.exerciseSet.findMany();
  }

  findOnePlanExercise(planExerciseId: number) {
    return this.prisma.exerciseSet.findFirst({ where: { planExerciseId: planExerciseId }});
  }

  findOne(id: number) {
    return this.prisma.exerciseSet.findUnique({ where: { id: id } });
  }

  update(id: number, updateExerciseSetDto: UpdateExerciseSetDto) {
    return this.prisma.exerciseSet.update({
      data: updateExerciseSetDto,
      where: { id: id },
    });
  }
  async remove(id: number) {
    return await this.prisma.exerciseSet.deleteMany({
      where: { id },
    });
  }

  removePlanExercise(id: number) {
    return this.prisma.exerciseSet.deleteMany({
      where: { planExerciseId: id },
    });
  }
}
