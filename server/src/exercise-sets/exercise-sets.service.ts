import { Injectable } from '@nestjs/common';
import { CreateExerciseSetDto } from './dto/create-exercise-set.dto';
import { UpdateExerciseSetDto } from './dto/update-exercise-set.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExerciseSetsService {
  constructor(private prisma: PrismaService) {}
  create(createExerciseSetDto: CreateExerciseSetDto) {
    return this.prisma.exerciseSet.create({ data: createExerciseSetDto });
  }

  findAll() {
    return this.prisma.exerciseSet.findMany();
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

  remove(id: number) {
    return this.prisma.exerciseSet.delete({ where: { id: id } });
  }
}
